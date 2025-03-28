# -------------- #
# System imports #

import asyncio
import configparser
import os
from pathlib import Path
from typing             import List
import telnetlib
import uuid

# ------------------- #
# Third party imports #


# For gns3 project duplication
import requests
import json

from requests.models import HTTPError


# ------------- #
# Local imports #


from utils.labs_checker     import checkers



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

async def main():

    lab_id = "routing-in-ip-networks"
    project_id = "4d655bbb-13be-45c7-be74-9486db187e7f"

    #TODO: lab_host
    lab_host = "127.0.0.1"

    #TODO: get port from DB
    user_port = 3080

    # Duplicate target lab
    access_token = gns3_user_get_token(user_port)

    if not lab_id in checkers:
        check_result = [f"lab_id '{lab_id}' not found"]
    else:
        checker = checkers[lab_id](
                lab_host, user_port)
        check_result = await checker.lab_perform_check(
                access_token, project_id,
                )

    print(check_result)

if __name__ == "__main__":
    asyncio.run(main())
