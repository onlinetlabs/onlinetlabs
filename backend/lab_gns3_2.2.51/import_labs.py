# Docs:
"""
GNS3 stores its projects in specific folder, defined in config.ini:
projects_path, which for now is '/data/projects' where '/data' is
docker container volume. To save repo memory space and not upload volume
folder ( which obviously could help us to persist GNS3 projects - that's
the main task ) we will be importing projects from binary files stored in:
./backend/lab/projects on container deployment.

So these projects in ./backend/lab/projects are labs' templates which
duplicates will be given to students to solve.

And the main purpose of this scrip is to import these labs' projects
on gns3server deployment.
"""

# Import command using curl
"""
curl -u "admin:1234" -X POST 'http://localhost:3080/v2/projects/3d7f1754-fea8-4c0a-92c2-305bcffa6287/import' -F 'name=01_test_duplicate' -F 'file=@./projects/01_test.gns3project'
"""
# Where:
# -u    : Credentials for gns3server
# 3d7f1754-fea8-4c0a-92c2-305bcffa6287  : Is unique project_id
#       which has format: minLength: 36, maxLength: 36,
#       pattern: ^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$
#       May be generated with pyhon uuid.uuid4()
# name  : Name of the project to be imported (may be any name).
# file  : Binary file of the project to be imported.



# -------------- #
# System imports #

import configparser
from pathlib    import Path
from typing     import NamedTuple


# ------------------- #
# Third party imports #

import requests


# ------------- #
# Local imports #


###############
#  CONSTANTS  #
###############

# File with GNS3 server config
GNS3_CONFIG_PATH:Path   = Path("config.ini")
# Labs to import to GNS3 server
GNS3_LABS_PATH:Path     = Path("projects")


#############
#  CLASSES  #
#############

class Gns3Config(NamedTuple):
    """
    Contains gns3server config params.
    """

    auth:bool
    user:str
    password:str
    projects_path:Path


##########
#  MAIN  #
##########

def gns3_get_credentials(config_path:Path) -> Gns3Config:
    """
    Reads local config.ini and extracts fields:
    - auth,
    - user,
    - password.
    """

    # Read the config.ini file
    config = configparser.ConfigParser()
    config.read(config_path)
    
    try:
        # Extract values from the Server section
        # Converts 'True' or 'False' strings to a boolean
        auth = config.getboolean('Server', 'auth')
        user = config.get('Server', 'user')
        password = config.get('Server', 'password')
        # Where to import to GNS3 labs:
        projects_path = Path( config.get('Server', 'projects_path') )

        gns3_config = Gns3Config(
                auth=auth,
                user=user,
                password=password,
                projects_path=projects_path,
                )
        return gns3_config

    except configparser.NoOptionError:
        # gns3server config.ini does not contain some of the params.
        print(f"[!] ERROR: gns3server config.ini doesnt contain some of the params.")
        exit()


def gns3_gather_all_labs(labs_path:Path) -> None:
    """
    """

    ...




# URL and authentication
url = "http://localhost:3080/v2/projects/3d7f1754-fea8-4c0a-92c2-305bcffa6287/import"
auth = ("admin", "1234")  # Username and password for authentication

# Files and form data
files = {
    "file": open("./projects/01_test.gns3project", "rb")  # Open the project file in binary mode
}
data = {
    "name": "01_test_duplicate"
}

# Send the POST request
response = requests.post(url, auth=auth, files=files, data=data)

# Print the response
print("Status Code:", response.status_code)
print("Response Body:", response.text)

def main():

    gns3_get_credentials(GNS3_CONFIG_PATH)


if __name__ == "__main__":
    main()
