# -------------- #
# System imports #

import configparser
import os
from pathlib import Path
from typing             import List
import telnetlib
from uuid               import UUID

# ------------------- #
# Third party imports #

from fastapi            import Depends
from fastapi            import HTTPException, Body, Depends

# For gns3 project duplication
import requests
import json

from requests.models import HTTPError


# ------------- #
# Local imports #

from utils.auth.model       import PostSchema
from utils.auth.auth_bearer import JWTBearer

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


def gns3_user_get_token(port:int) -> str|None:
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


def gns3_user_project_create(
        token:str, port:int,
        project_name:str,
        ) -> str|None:
    """
    """

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
        response = response.json()["project_id"]
        return response
    else:
        return None



# ------- #
# CLASSES #


# --------- #
# ENDPOINTS #

@app.post("/api/lab/start",
          dependencies=[Depends(JWTBearer())],
          tags=TAGS)
def lab_start(lab_id:str):
    """
    - lab_id:
    """
    
    #TODO: check if the lab is already created
    project_id:str|None = None

    #TODO: get port from DB
    user_port = 3080

    if project_id is None:
        # Get access_token for GNS3 API:
        access_token = gns3_user_get_token(user_port)
        if access_token is None:
            # If GNS3 API credentials were incorrect:
            raise HTTPException(
                    status_code=401,
                    detail="Cannot access lab server. Address admin.",
                    )

        project_id = gns3_user_project_create(
                access_token, user_port,
                lab_id,
                )

    # Return project_id for lab
    lab_link:str = \
            f"http://127.0.0.1:{user_port}/static/web-ui/controller/1/project/{project_id}"

    return {
        "lab_link": lab_link,
        "lab_project_id": project_id,
        "lab_port": user_port,
    }


@app.post("/api/lab/check",
          dependencies=[Depends(JWTBearer())],
          tags=TAGS)
async def lab_check(lab_id:str, project_id:str):
    """
    """

    #TODO: lab_host
    lab_host = "127.0.0.1"

    #TODO: get port from DB
    user_port = 3080

    # Duplicate target lab
    access_token = gns3_user_get_token(user_port)
    if access_token is None:
        # For some reasons GNS3 server credentials were incorrect
        raise HTTPException(
                status_code=401,
                detail="Cannot access lab server. Address admin.",
                )

    if not lab_id in checkers:
        logs = {f"Project_id valid": False}

    else:
        checker = checkers[lab_id](
                lab_host, user_port)
        await checker.lab_perform_check(
                access_token, project_id,
                )
        logs = checker.checklog

    passed = all(check for check in logs.values())

    return {
        "passed": passed,
        "logs": logs,
    }
