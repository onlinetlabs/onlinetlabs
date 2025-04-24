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
from utils.datastructures   import database, logger
from utils.endpoints.lab_methods    import (
        lab_check_project_exists,
        lab_user_get_token,
        lab_user_project_create,
        lab_user_project_delete,
        lab_user_get_token,
        lab_get_roleid,
        lab_create_user,
        lab_user_add_role,
        )

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



# ------- #
# CLASSES #

# POST-запрос с передачей данных через тело
class LabDeleteRequestBody(BaseModel):
    project_id:str="4d655bbb-13be-45c7-be74-9486db187e7f"

class LabStartRequestBody(BaseModel):
    lab_id:str="routing-in-ip-networks"

class LabCheckRequestBody(BaseModel):
    project_id:str="4d655bbb-13be-45c7-be74-9486db187e7f"

class LabConvertRequestBody(BaseModel):
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

    # 1. GET ACCESS TOKEN FOR GNS3 (LAB) API:
    access_token:str|None = lab_user_get_token(user_port)
    if access_token is None:
        raise HTTPException(
                status_code=501,
                detail="Cannot start lab: lab token error.",
                )

    # 2. CREATE LAB USER
    creds:RealDictRow|None = await database.lab.get_user_lab_creds(user_email)
    if creds is None:
        logger.core.debug(f"Lab user not found. Generating new...")
        creds:tuple[str,str]|None = await lab_create_user(
                user_port, access_token, user_email)
        logger.core.debug(f"Lab_user generated with result: {creds[0]}")
        if creds is None:
            #TODO: Implement
            logger.core.error(f"Could not create lab creds.")
            # this user may be already created.
            raise Exception
        user_id_lab, password = creds
        # Store into the DB:
        result:bool = await database.lab.add_user_lab_creds(
                user_email,
                user_id_lab,
                password,
                )
        logger.core.debug(f"Newly created lab_user stored: {result}")
    else:
        user_id_lab = creds["user_id_lab"]
        password = creds["password_lab"]

    
    # 3. CREATE PROJECT:
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
    if project_id is None:
        raise HTTPException(
                status_code=501,
                detail=f"Cannot get project_id.",
                )
    logger.core.debug(f"Got project_id: {project_id}")

    # 4. CREATE LAB USER ROLE:
    # 4.1 Get role_id
    role_name = "User"
    role_id:str|None = await lab_get_roleid(
            access_token, user_port, role_name=role_name)
    if role_id is None:
        raise HTTPException(
                status_code=501,
                detail=f"Cannot get role_id for '{role_name}'.",
                )
    # 4.2 Assign role to the user:
    result:bool = await lab_user_add_role(
            user_port,
            user_id_lab,
            role_id,
            access_token,
            project_id,
            )
    if result is False:
        raise HTTPException(
                status_code=501,
                detail=f"Got user lab success, but cant assign the role.",
                )

    lab_link:str = \
            f"http://127.0.0.1:{user_port}/static/web-ui/controller/1/project/{project_id}"

    return {
        "lab_link": lab_link,
        "lab_project_id": project_id,
        "lab_port": user_port,
        "lab_user": user_email.split("@")[0],
        "lab_passwd": password,
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


@app.get("/api/lab/project_info/{project_id}",
         dependencies=[Depends(JWTBearer())],
         summary="Get project params",
         tags=TAGS)
async def lab_project_id_to_lab_id(
        project_id:UUID,
        payload:JWTPayloadSchema=Depends(JWTBearer()),
        ):
    """
    project_id to lab_id.
    """

    #TODO: lab_host
    lab_host = "127.0.0.1"
    #TODO: get port from DB
    user_port = 3080

    user_email:str = payload.email

    # Duplicate target lab
    access_token = lab_user_get_token(user_port)
    if access_token is None:
        # For some reasons GNS3 server credentials were incorrect
        raise HTTPException(
                status_code=401,
                detail="Cannot access lab server. Address admin.",
                )

    # CONVERT PROJECT_ID TO LAB_ID
    lab_id:str|None = await database.lab.get_user_labid(
            user_email, str(project_id))
    if lab_id is None:
        raise HTTPException(
                status_code=400,
                detail="Provided project_id doesnt exist.",
                )

    # Extract user lab credentials from the DB:
    creds:RealDictRow|None = await database.lab.get_user_lab_creds(user_email)
    if creds is None:
        user_id_lab = None
        password = None
    else:
        user_id_lab = creds["user_id_lab"]
        password = creds["password"]

    # GATHER SOME OTHER INFO

    return {
        "lab_id": lab_id,
        "lab_user": user_email.split("@")[0],
        "lab_passwd": password,
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
