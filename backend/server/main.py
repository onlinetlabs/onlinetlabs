# -------------- #
# System imports #


# ------------------- #
# Third party imports #

import uvicorn


# ------------- #
# Local imports #


# Import FastAPI app
from utils.endpoints.core   import app
# Need call (import) rest endpoints sequentially
# to add endpoints to the 'app'
import utils.endpoints.auth
import utils.endpoints.lab
import utils.endpoints.control

import utils.endpoints.debug




# --------- #
# CONSTANTS #


# ------- #
# OBJECTS #


# --------- #
# FUNCTIONS #


# ------- #
# CLASSES #


# ---- #
# MAIN #

def main():
    uvicorn.run(app, host="0.0.0.0", port=8000)


if __name__ == "__main__":
    main()
