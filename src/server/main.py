# -------------- #
# System imports #


# ------------------- #
# Third party imports #

import uvicorn


# ------------- #
# Local imports #


# Import FastAPI app
from utils.endpoints.core   import app
# Add endpoints by importing modules
import utils.endpoints.auth
import utils.endpoints.posts
import utils.endpoints.test




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
