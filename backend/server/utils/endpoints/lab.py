# -------------- #
# System imports #

import os
from typing             import List
import telnetlib

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


from .core                   import app




# --------- #
# CONSTANTS #

TAGS:List = [
        "LAB",
        ]

LAB_HOST = os.getenv('LAB_HOST')

# ------- #
# OBJECTS #


# --------- #
# FUNCTIONS #

def temp_gns3_get_token() -> str|None:
    """
    """

    # URL and data
    url = f"http://{LAB_HOST}:3080/v3/access/users/authenticate"
    data = {
        "username": "admin",
        "password": "admin_gns3"
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


def temp_gns3_duplicate(token:str, project_id:str) -> str|None:
    """
    """

    url = f"http://{LAB_HOST}:3080/v3/projects/{project_id}/duplicate"
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "name": "test_lab"
    }
    
    response = requests.post(url, headers=headers, json=payload)
    
    if response.ok:
        response = response.json()["project_id"]
        return response
    else:
        return None


def temp_get_project_nodes(token:str, project_id:str) -> list[dict]:
    """
    """

    url = f"http://{LAB_HOST}:3080/v3/projects/{project_id}/nodes"
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    response = requests.get(url, headers=headers)
    
    if response.ok:
        response = response.json()
        return response
    else:
        return []


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



# TODO: nodes reboot wipes nodes configs.
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

@app.post("/lab/deploy",
          dependencies=[Depends(JWTBearer())],
          tags=TAGS)
def lab_deploy(cource_num:int, lab_num:int):
    """
    - cource_num:
    - lab_num:
    """

    # Duplicate target lab
    access_token = temp_gns3_get_token()
    if access_token is None:
        # For some reasons GNS3 server credentials were incorrect
        raise HTTPException(
                status_code=401,
                detail="Not authenticated",
                )

    duplicate_from_project_id:str = "00000000-0000-0000-0000-000000000000"
    project_id_duplicate = temp_gns3_duplicate(
            access_token, duplicate_from_project_id)

    # Return project_id for lab
    lab_duplicate_link:str = \
            f"http://127.0.0.1:3080/static/web-ui/controller/1/project/{project_id_duplicate}"

    return {
        "lab_link": lab_duplicate_link,
        "lab_project_id": project_id_duplicate
    }


@app.post("/lab/check",
          dependencies=[Depends(JWTBearer())],
          tags=TAGS)
def lab_check(lab_project_id:str):
    """
    """

    # Duplicate target lab
    access_token = temp_gns3_get_token()
    if access_token is None:
        # For some reasons GNS3 server credentials were incorrect
        raise HTTPException(
                status_code=401,
                detail="Not authenticated",
                )

    is_passed:bool = temp_gns3_lab_check(access_token, lab_project_id)

    return {
        "passed": is_passed
    }
