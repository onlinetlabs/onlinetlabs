"""
This script intended to automatically install devices' images
(like cisco routers, etc) into gns3server.

# Cisco routers
Script copies images into proper directory and creates templates
so these devises could be visible in main project menu.
"""

# -------------- #
# System imports #

import asyncio
import configparser
import json
from pathlib        import Path
import requests
import shutil
from time           import sleep
from typing         import NamedTuple


# ------------------- #
# Third party imports #

...

# ------------- #
# Local imports #

...


##############
#  CONSTANTS #
##############

LAB_CONFIG_PATH:Path            = Path(".", "config.ini")
CISCO_ROUTERS_IMAGES_SRC:Path   = Path(".", "devices", "cisco", "routers")
CISCO_ROUTERS_IMAGES_DST:Path   = Path("/", "data", "images", "IOS")

WAIT_GNS3SERVER_STARTUP:float   = 10
WAIT_GNS3SERVER_UPDATE:float    = 3

class CiscoTemplateParams(NamedTuple):
    name:str
    image:str
    platform:str


###############
#  FUNCTIONS  #
###############

def lab_get_token(host:str, port:str, user:str, passwd:str) -> str|None:
    url = f"http://{host}:{port}/v3/access/users/authenticate"
    data = {
            "username": user,
            "password": passwd,
            }
    headers = {
            "Content-Type": "application/json"
            }
    response = requests.post(url, data=json.dumps(data), headers=headers)

    # Check the response
    if response.status_code == 200:
        return response.json()["access_token"]
    else:
        return None


def lab_get_config(config_path:Path) -> configparser.ConfigParser:
    """
    Read config_file, create ConfigParser object.
    """
    # Create a ConfigParser object
    config = configparser.ConfigParser()
    # Read the config.ini file
    config.read('config.ini')
    return config

def get_cisco_routers_paths(directory:Path) -> list[Path]:
    """
    Generates Paths for images inside 'directory'.
    """
    paths:list[Path] = []
    # Use the rglob method to retrieve all files in the directory
    paths = [item for item in directory.glob('*') if item.is_file()]
    return paths


def copy_files_to_destination(
        files:list[Path], destination:Path) -> None:
    # Create the destination directory if it doesn't exist
    destination.mkdir(parents=True, exist_ok=True)
    for file in files:
        shutil.copy(file, destination)


def cisco_rt_template_generate(file:Path) -> CiscoTemplateParams:
    """
    Generate templates for cisco routers.
    """
    image       = file.name
    name        = f"Cisco {image.split('-')[0]}"
    platform    = image.split("-")[0]

    cisco_template_params = CiscoTemplateParams(
            name=name,
            image=image,
            platform=platform,
            )
    
    print(f"[DEBUG] Created cisco template:\n{cisco_template_params}")
    return cisco_template_params


def cisco_rt_template_create(
        host:str, port:str, token:str,
        template_params:CiscoTemplateParams) -> None:
    """
    Send post request to lab server.
    """
    
    url = f"http://{host}:{port}/v3/templates"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }
    data = {
        "name": template_params.name,
        "template_type": "dynamips",
        "compute_id": "local",
        "image": template_params.image,
        "ram": 256,
        "platform": template_params.platform,
        "npe": "npe-400",
        "adapters": [
            # Slot 0: 8 Ethernet ports
            { "slot": 0, "adapter_type": "PA-8E" },
            # Slot 1: 8 Ethernet ports
            { "slot": 1, "adapter_type": "PA-8E" },
            # Slot 2: 4 serial ports (optional)
            { "slot": 2, "adapter_type": "PA-4T" }
            ]
    }

    response = requests.post(url, headers=headers, json=data)
    
    print(f"[DEBUG] Sending request to create cisco_rt template...")
    if response.status_code == 200:
        print("Request was successful:", response.json())
    else:
        print("Error:", response.status_code, response.text)
    



##########
#  MAIN  #
##########

async def main():
    
    # Wait while gns3 server starts
    sleep(WAIT_GNS3SERVER_STARTUP)

    lab_config = lab_get_config(LAB_CONFIG_PATH)
    # lab_host:str = lab_config["Server"]["host"]
    lab_host:str = "127.0.0.1"
    lab_port:str = lab_config["Server"]["port"]
    lab_user:str = lab_config["Controller"]["default_admin_username"]
    lab_pass:str = lab_config["Controller"]["default_admin_password"]
    images_path:Path = Path(lab_config["Server"]["images_path"])

    lab_token = lab_get_token(lab_host, lab_port, lab_user, lab_pass)
    print(f"[DEBUG] lab_token: {lab_token}")

    # Get cisco routers' images Paths
    cisco_rt_images:list[Path] = \
            get_cisco_routers_paths(CISCO_ROUTERS_IMAGES_SRC)

    copy_files_to_destination(cisco_rt_images, CISCO_ROUTERS_IMAGES_DST)
    # Give LAB some time to detect new files:
    sleep(WAIT_GNS3SERVER_UPDATE)

    for path in cisco_rt_images:
        template_params = cisco_rt_template_generate(path)
        cisco_rt_template_create(
                lab_host, lab_port, lab_token, template_params)


if __name__ == "__main__":
    asyncio.run(main())
