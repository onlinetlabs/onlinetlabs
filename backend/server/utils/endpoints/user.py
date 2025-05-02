# -------------- #
# System imports #

from enum               import Enum


# ------------------- #
# Third party imports #

from fastapi            import Depends
from psycopg2.extras    import RealDictRow


# ------------- #
# Local imports #

from utils.auth.model       import (
        JWTPayloadSchema
        )
from utils.auth.auth_bearer import JWTBearer

from utils.datastructures       import database

from .core                   import app




# --------- #
# CONSTANTS #

TAGS:list[str|Enum]|None = [
        "USER",
        ]

# ------- #
# OBJECTS #


# --------- #
# FUNCTIONS #


# ------- #
# CLASSES #


# ---- #
# MAIN #

##################
# AUTHENTICATION #
##################

@app.get("/api/user",
         tags=TAGS,
         dependencies=[Depends(JWTBearer())],
         )
async def user_get(
        payload:JWTPayloadSchema=Depends(JWTBearer()),
        ):
    """
    """

    user_email = payload.email

    user_db:RealDictRow|None = await database.auth.get_user_by_email(
            user_email)

    return user_db

