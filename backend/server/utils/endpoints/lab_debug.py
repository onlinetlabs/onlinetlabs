# -------------- #
# System imports #

import configparser
import os
from pathlib import Path
from typing             import List
import telnetlib
import uuid

# ------------------- #
# Third party imports #

# from fastapi            import Depends
# from fastapi            import HTTPException, Body, Depends

# For gns3 project duplication
import requests
import json

from requests.models import HTTPError


# ------------- #
# Local imports #

# from utils.auth.model       import PostSchema
# from utils.auth.auth_bearer import JWTBearer


# from .core                   import app




# --------- #
# CONSTANTS #

TAGS:List = [
        "LAB",
        ]

LAB_HOST = os.getenv('LAB_HOST')

# Get the absolute path of this script's directory
script_dir = Path(__file__).resolve().parent.parent.parent.parent
# Navigate to project root -> m1 -> config.ini
config_path = script_dir / "lab" / "config.ini"
lab_config = configparser.ConfigParser()
# Read the config.ini file
lab_config.read( config_path )


# ------- #
# OBJECTS #


# --------- #
# FUNCTIONS #


def gns3_user_get_token(port:int) -> str|None:
    """
    """

    # URL and data
    url = f"http://{LAB_HOST}:{port}/v3/access/users/authenticate"
    data = {
        "username": lab_config["Controller"]["default_admin_username"],
        "password": lab_config["Controller"]["default_admin_password"]
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


def temp_gns3_ping(node:dict) -> bool:
    """
    """

    # host = node['console_host']
    host = LAB_HOST
    port = node['console']

    tn = telnetlib.Telnet(host, port)
    tn.write(b"ping 192.168.1.2\r\n")
    while True:
        response = tn.read_until(b"\r\n")
        # b'84 bytes from 192.168.1.2 icmp_seq=5 ttl=64 time=0.337 ms\r\n'
        if b'bytes from' in response:
            tn.write(b"quit\r\n")
            tn.close()
            return True
        # b'host (192.168.1.3) not reachable\r\n'
        elif b'not reachable' in response:
            tn.write(b"quit\r\n")
            tn.close()
            return False



# TODO: remove (block) extra abilities in upper left corner menu.
def temp_gns3_lab_check(token:str, lab_project_id:str) -> bool:
    """
    """

    project_nodes = temp_get_project_nodes(token, lab_project_id)
    PC1 = project_nodes[0]
    try:
        is_success:bool = temp_gns3_ping(PC1)
    except Exception as e:
        print(f"[!] ERROR: could not ping PC1: {e}")
        is_success:bool = False
    return is_success


# ------- #
# CLASSES #


# --------- #
# ENDPOINTS #

#@app.post("/lab/start",
#          dependencies=[Depends(JWTBearer())],
#          tags=TAGS)
#def lab_deploy(lab_id:str):
#    """
#    - lab_id:
#    """
    
#    #TODO: check if the lab is already created
#    project_id:str|None = None

#    #TODO: get port from DB
#    user_port = 3080

#    if project_id is None:
#        # Get access_token for GNS3 API:
#        access_token = gns3_user_get_token(user_port)
#        if access_token is None:
#            # If GNS3 API credentials were incorrect:
#            raise HTTPException(
#                    status_code=401,
#                    detail="Not authenticated",
#                    )

#        project_id = gns3_user_project_create(
#                access_token, user_port,
#                lab_id,
#                )

#    # Return project_id for lab
#    lab_link:str = \
#            f"http://127.0.0.1:{user_port}/static/web-ui/controller/1/project/{project_id}"

#    return {
#        "lab_link": lab_link,
#        "lab_project_id": project_id,
#        "lab_port": user_port,
#    }


#@app.post("/lab/check",
#          dependencies=[Depends(JWTBearer())],
#          tags=TAGS)
#def lab_check(lab_project_id:str):
#    """
#    """

#    # Duplicate target lab
#    access_token = temp_gns3_get_token()
#    if access_token is None:
#        # For some reasons GNS3 server credentials were incorrect
#        raise HTTPException(
#                status_code=401,
#                detail="Not authenticated",
#                )

#    is_passed:bool = temp_gns3_lab_check(access_token, lab_project_id)

#    return {
#        "passed": is_passed
#    }


if __name__ == "__main__":
    print(config_path)
    print(lab_config["Controller"]["default_admin_username"])
