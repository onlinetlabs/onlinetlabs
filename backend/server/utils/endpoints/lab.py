# -------------- #
# System imports #

import configparser
import os
from pathlib import Path
from typing             import List
import telnetlib
from uuid               import UUID, uuid4

# ------------------- #
# Third party imports #

from fastapi            import Depends
from fastapi            import HTTPException, Body, Depends
from fastapi.encoders   import jsonable_encoder
from fastapi.responses  import JSONResponse

from psycopg2.extras    import RealDictRow
from pydantic import BaseModel

# For gns3 project duplication
import requests
import json

from requests.models import HTTPError, Response


# ------------- #
# Local imports #

from utils.auth.model       import JWTPayloadSchema, PostSchema
from utils.auth.auth_bearer import JWTBearer
from utils.datastructures   import database

from utils.labs_checker     import checkers


from .core                   import app




# --------- #
# CONSTANTS #

TAGS:List = [
        "LAB",
        ]

LAB_HOST = os.getenv('LAB_HOST')

# Get the absolute path of this script's directory
# script_dir = Path(__file__).resolve().parent.parent.parent.parent
# # Navigate to project root -> m1 -> config.ini
# config_path = script_dir / "lab" / "config.ini"
# lab_config = configparser.ConfigParser()
# # Read the config.ini file
# lab_config.read( config_path )

# ------- #
# OBJECTS #


# --------- #
# FUNCTIONS #


def lab_user_get_token(port:int) -> str|None:
    """
    """

    # URL and data
    url = f"http://{LAB_HOST}:{port}/v3/access/users/authenticate"
    # data = {
    #     "username": lab_config["Controller"]["default_admin_username"],
    #     "password": lab_config["Controller"]["default_admin_password"]
    # }
    data = {
        "username": "admin",
        "password": "admin"
    }
    
    # Set headers
    headers = {
        "Content-Type": "application/json"
    }
    
    # Make the POST request
    response = requests.post(url, data=json.dumps(data), headers=headers)
    
    # Check the response
    if response.status_code == 200:
        return response.json()["access_token"]
    else:
        return None


async def lab_user_project_create(
        token:str, port:int,
        lab_id:str, user_email:str,
        ) -> str|None:
    """
    """

    project_name = lab_id + str( uuid4() )
    url = f"http://{LAB_HOST}:{port}/v3/projects"
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "name": project_name,
    }
    
    response = requests.post(url, headers=headers, json=payload)
    
    if response.ok:
        project_id = response.json()["project_id"]
        await database.lab.add_user_project(
                user_email, lab_id, project_id)
        return project_id
    else:
        return None


async def lab_user_project_delete(
        token:str,
        port:int,
        project_id:str,
        ) -> Response:
    """
    """

    url = f"http://{LAB_HOST}:{port}/v3/projects/{project_id}"
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    payload = {
    }
    
    response = requests.delete(url, headers=headers, json=payload)
    return response


async def lab_check_project_exists(
        token:str, port:int,
        project_id:str,
        ) -> bool:
    """
    """

    url = f"http://{LAB_HOST}:{port}/v3/projects/{project_id}"
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    payload = {
    }
    
    response = requests.get(url, headers=headers, json=payload)
    
    if response.ok:
        return True
    else:
        return False



# ------- #
# CLASSES #

# POST-запрос с передачей данных через тело
class LabDeleteRequestBody(BaseModel):
    project_id:str="4d655bbb-13be-45c7-be74-9486db187e7f"

class LabStartRequestBody(BaseModel):
    lab_id:str="routing-in-ip-networks"

class LabCheckRequestBody(BaseModel):
    project_id:str="4d655bbb-13be-45c7-be74-9486db187e7f"

# --------- #
# ENDPOINTS #



@app.post("/api/lab/start",
          dependencies=[Depends(JWTBearer())],
          tags=TAGS)
async def lab_start(
        body:LabStartRequestBody,
        payload:JWTPayloadSchema=Depends(JWTBearer()),
        ):
    """
    - lab_id:
    """

    #TODO: get port from DB
    user_port = 3080
    
    user_email = payload.email
    lab_id = body.lab_id

    # Get access_token for GNS3 API:
    access_token:str|None = lab_user_get_token(user_port)
    if access_token is None:
        raise HTTPException(
                status_code=501,
                detail="Cannot start lab: lab token error.",
                )
    
    project_id:str|None = await database.lab.get_user_project(
            user_email=user_email,
            lab_id=lab_id,
            )
    if project_id is not None:
        result:bool = await lab_check_project_exists(
                access_token, user_port, project_id)
        if not result:
            project_id = await lab_user_project_create(
                    access_token, user_port,
                    lab_id, user_email,
                    )

    elif project_id is None:
        project_id = await lab_user_project_create(
                access_token, user_port,
                lab_id, user_email,
                )

    # Return project_id for lab
    lab_link:str = \
            f"http://127.0.0.1:{user_port}/static/web-ui/controller/1/project/{project_id}"
    ##TODO: return real labs.
    #project_id = "4d655bbb-13be-45c7-be74-9486db187e7f"
    #lab_link:str = \
    #        f"http://127.0.0.1:{user_port}/static/web-ui/controller/1/project/4d655bbb-13be-45c7-be74-9486db187e7f"

    return {
        "lab_link": lab_link,
        "lab_project_id": project_id,
        "lab_port": user_port,
    }


@app.post("/api/lab/check",
          dependencies=[Depends(JWTBearer())],
          tags=TAGS)
async def lab_check(
        body:LabCheckRequestBody,
        payload:JWTPayloadSchema=Depends(JWTBearer()),
        ):
    """
    """

    #TODO: lab_host
    lab_host = "127.0.0.1"
    #TODO: get port from DB
    user_port = 3080

    user_email:str = payload.email
    project_id = body.project_id

    # Duplicate target lab
    access_token = lab_user_get_token(user_port)
    if access_token is None:
        # For some reasons GNS3 server credentials were incorrect
        raise HTTPException(
                status_code=401,
                detail="Cannot access lab server. Address admin.",
                )

    lab_id:str|None = await database.lab.get_user_labid(
            user_email, project_id)
    if lab_id is None:
        raise HTTPException(
                status_code=400,
                detail="Provided project_id doesnt exist.",
                )

    if not lab_id in checkers:
        logs = {f"Project_id valid": False}

    else:
        checker = checkers[lab_id](lab_host, user_port)
        await checker.lab_perform_check(
                access_token, project_id,
                )
        logs = checker.checklog

    passed = all(check for check in logs.values())

    #TODO: process storage results
    # Store check results in DB for that user:
    result:bool = await database.lab.add_user_checklog(
            user_email, lab_id, passed, logs)

    return {
        "passed": passed,
        "logs": logs,
        "stored": result
    }


@app.delete("/api/lab/delete",
          dependencies=[Depends(JWTBearer())],
          tags=TAGS)
async def lab_delete(
        body: LabDeleteRequestBody,
        payload:JWTPayloadSchema=Depends(JWTBearer()),
        ):
    """
    - lab_id:
    """

    #TODO: get port from DB
    user_port = 3080
    success = False
    
    user_email = payload.email
    project_id = body.project_id

    # Get access_token for GNS3 API:
    access_token:str|None = lab_user_get_token(user_port)
    if access_token is None:
        raise HTTPException(
                status_code=501,
                detail="Cannot start lab: lab token error.",
                )

    response:Response = await lab_user_project_delete(
            access_token, user_port, project_id)
    if response.ok:
        await database.lab.del_user_project(user_email, project_id)
        success = True

    return {
            "success": success,
    }


@app.get("/api/lab/get_user_projects",
         dependencies=[Depends(JWTBearer())],
         tags=TAGS)
async def get_user_projects(
        payload:JWTPayloadSchema=Depends(JWTBearer()),
        ):

    user_email:str = payload.email

    if payload is None:
        # Invalid or expired token.
        raise HTTPException(
                status_code=403, detail="Invalid or expired token.")

    user_projects:list[RealDictRow]|None \
            = await database.test.get_user_projects(user_email)
    return JSONResponse(
            status_code=200,
            # 'jsonable_encoder' fixes problem when JSONResponse cant
            # parse python datetime.date object into string.
            content=jsonable_encoder(user_projects),
            )


@app.get("/api/lab/get_user_checklogs",
         dependencies=[Depends(JWTBearer())],
         tags=TAGS)
async def get_user_checklogs(
        project_id:str,
        payload:JWTPayloadSchema=Depends(JWTBearer()),
        ):

    user_email:str = payload.email

    if payload is None:
        # Invalid or expired token.
        raise HTTPException(
                status_code=403, detail="Invalid or expired token.")


    lab_id:str|None = await database.lab.get_user_labid(
            user_email, project_id)
    if lab_id is None:
        raise HTTPException(
                status_code=400,
                detail="Provided project_id doesnt exist.",
                )

    result:list[RealDictRow]|None = await database.lab.get_user_checklogs(
            user_email, lab_id)

    return JSONResponse(
            status_code=200,
            # 'jsonable_encoder' fixes problem when JSONResponse cant
            # parse python datetime.date object into string.
            content=jsonable_encoder(result),
            )
