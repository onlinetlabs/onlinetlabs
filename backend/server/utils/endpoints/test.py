# -------------- #
# System imports #

from typing             import List

# ------------------- #
# Third party imports #

from fastapi.encoders   import jsonable_encoder
from fastapi.responses  import JSONResponse
from psycopg2.extras    import RealDictRow
from fastapi            import HTTPException, Body, Depends


# ------------- #
# Local imports #

from utils.auth.model       import (
        UserSignupSchema, UserLoginSchema, JWTPayloadSchema
        )
from utils.auth.model       import PostSchema
from utils.auth.auth_bearer import JWTBearer
from utils.auth.auth_handler    import signJWT, decodeJWT

from utils.datastructures       import logger, database

from .core                   import app




# --------- #
# CONSTANTS #

TAGS:List = [
        "TEST",
        ]


# ------- #
# OBJECTS #


# --------- #
# FUNCTIONS #


# ------- #
# CLASSES #


# ---- #
# MAIN #


#########
# TESTS #
#########

# DATABASE TEST

@app.get("/database/get_all_users", tags=TAGS)
async def get_all_users():
    users:list[RealDictRow] | None = await database.test.get_all_users()
    return JSONResponse(
            status_code=200,
            # 'jsonable_encoder' fixes problem when JSONResponse cant
            # parse python datetime.date object into string.
            content=jsonable_encoder(users),
            )


@app.get("/database/get_user_projects",
         dependencies=[Depends(JWTBearer())],
         tags=TAGS)
async def get_user_projects(
        payload:JWTPayloadSchema=Depends(JWTBearer()),
        ):

    # Try to extract user data from token (user_email, expires).
    # payload:JWTPayloadSchema = decodeJWT(refresh_token)
    # payload = JWTPayloadSchema(**{'email':'example@mail.com','expires':1234})
    user_email:str = payload.email

    if payload is None:
        # Invalid or expired token.
        raise HTTPException(
                status_code=403, detail="Invalid or expired token.")

    user_projects:list[RealDictRow]|None \
            = await database.test.get_user_projects(user_email)
    return JSONResponse(
            status_code=200,
            # 'jsonable_encoder' fixes problem when JSONResponse cant
            # parse python datetime.date object into string.
            content=jsonable_encoder(user_projects),
            )
