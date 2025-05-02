# -------------- #
# System imports #

import asyncio


# ------------------- #
# Third party imports #

from elogger        import Logger
from pydantic       import BaseModel

# ------------- #
# Local imports #

from .database_api  import Database


# --------- #
# CONSTANTS #


# ------- #
# OBJECTS #

# Create logger object to make and store logs.
logger = Logger()
logger.create(module_name="core")
logger.core.info("Logger module initialised.")

# Create database object to communicate with postgres
database = Database()


# --------- #
# FUNCTIONS #


# ------- #
# CLASSES #


# ---- #
# MAIN #
