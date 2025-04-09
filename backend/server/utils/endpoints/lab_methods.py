# -------------- #
# System imports #

import os
from uuid               import uuid4
import secrets
import string

# ------------------- #
# Third party imports #


# For gns3 project duplication
import requests
import json

from requests.models import Response


# ------------- #
# Local imports #

from utils.datastructures   import database



# --------- #
# CONSTANTS #


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

    project_name = lab_id + "__" + str( uuid4() )
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


# USER ROLES RELATED

async def lab_get_roleid(
        token:str,
        port:int,
        role_name:str,
        ) -> str|None:
    """
    """

    # URL and data
    url = f"http://{LAB_HOST}:{port}/v3/access/roles"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    payload = {
    }
    
    # Make the request
    response = requests.get(url, headers=headers, json=payload)
    
    # Check the response
    role_id = None
    if response.status_code == 200:
        for role in response.json():
            if role["name"] == role_name:
                role_id = role["role_id"]
                break
        return role_id
    else:
        return None


async def lab_create_user(
        port:int,
        token:str,
        user_email:str,
        ) -> tuple[str,str]|None:
    """
    Create user for GNS3. Return user_id for the gns3server (uesr_id_lab).
    """

    # URL and data
    url = f"http://{LAB_HOST}:{port}/v3/access/users"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    def generate_password(length=12):
        # characters = string.ascii_letters + string.digits + string.punctuation
        characters = string.ascii_letters + string.digits
        return ''.join(secrets.choice(characters) for _ in range(length))
    password = generate_password(8)
    
    payload = {
        "username": user_email.split("@")[0],
        "is_active": True,
        "email": user_email,
        "full_name": "none",
        "password": password,
    }
    
    # Make the request
    response = requests.post(url, headers=headers, json=payload, )
    
    # Check the response
    if response.status_code == 200 or response.status_code == 201:
        return ( response.json()["user_id"], password )
    else:
        return None


async def lab_user_add_role(
        port:int,
        user_id_lab:str,
        role_id:str,
        token:str,
        project_id:str,
        ) -> bool:
    """
    Adds user_id_lab role_id. The rest it prohibited.
    """

    # URL and data
    url = f"http://{LAB_HOST}:{port}/v3/access/acl"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    
    payload = {
        "ace_type": "user",
        "path": f"/projects/{project_id}",
        "propagate": True,
        "allowed": True,
        "user_id": user_id_lab,
        "group_id": None,
        "role_id": role_id
    }
    
    # Make the request
    response = requests.post(url, headers=headers, json=payload, )
    print(f"[DEBUG] Got response1:\n{response}")
    print(f"[DEBUG] Got response1:\n{response.json()}")
    
    # Check the response
    if response.status_code != 200 and response.status_code != 201:
        return False

    # PROHIBIT THE REST
    url = f"http://{LAB_HOST}:{port}/v3/access/acl"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    
    payload = {
        "ace_type": "user",
        "path": f"/",
        "propagate": True,
        "allowed": False,
        "user_id": user_id_lab,
        "group_id": None,
        "role_id": role_id
    }
    
    # Make the request
    response = requests.post(url, headers=headers, json=payload, )
    print(f"[DEBUG] Got response2:\n{response}")
    print(f"[DEBUG] Got response2:\n{response.json()}")
    
    # Check the response
    if response.status_code != 200 and response.status_code != 201:
        return False
    return True

