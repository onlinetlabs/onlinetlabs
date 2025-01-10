# -------------- #
# System imports #

from typing             import List
import telnetlib

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





# --------- #
# CONSTANTS #

TAGS:List = [
        "LAB",
        ]


# ------- #
# OBJECTS #


# --------- #
# FUNCTIONS #

def temp_gns3_get_token() -> str|None:
    """
    """

    # URL and data
    url = "http://localhost:3080/v3/access/users/authenticate"
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

    url = f"http://localhost:3080/v3/projects/{project_id}/duplicate"
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "name": "test_lab"
    }
    
    response = requests.post(url, headers=headers, json=payload)
    print(response.json())
    
    if response.ok:
        response = response.json()["project_id"]
        return response
    else:
        return None




def temp_get_project_nodes(token:str, project_id:str) -> list[dict]:
    """
    """

    url = f"http://localhost:3080/v3/projects/{project_id}/nodes"
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    response = requests.get(url, headers=headers)
    print(response.json())
    
    if response.ok:
        response = response.json()
        return response
    else:
        return []


def temp_gns3_ping(node:dict) -> bool:
    """
    """

    host = node['console_host']
    port = node['console']

    tn = telnetlib.Telnet(host, port)
    tn.write(b"ping 192.168.1.2\r\n")
    while True:
        response = tn.read_until(b"\r\n")
        # b'84 bytes from 192.168.1.2 icmp_seq=5 ttl=64 time=0.337 ms\r\n'
        if b'bytes from' in response:
            return True
        # b'host (192.168.1.3) not reachable\r\n'
        elif b'not reachable' in response:
            return False



# TODO: nodes reboot wipes nodes configs.
# TODO: remove (block) extra abilities in upper left corner menu.
def temp_gns3_lab_check(token:str, lab_project_id:str) -> bool:
    """
    """

    project_nodes = temp_get_project_nodes(token, lab_project_id)
    PC1 = project_nodes[0]
    is_success:bool = temp_gns3_ping(PC1)
    return is_success


# ------- #
# CLASSES #


# --------- #
# ENDPOINTS #

if __name__ == "__main__":

    access_token = temp_gns3_get_token()
    _id = "00000000-0000-0000-0000-000000000000"
    temp_gns3_duplicate(access_token, _id)

    # passed:bool = temp_gns3_lab_check(access_token, _id)
    # print(passed)
