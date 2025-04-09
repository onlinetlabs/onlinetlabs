# -------------- #
# System imports #

from typing             import List

# ------------------- #
# Third party imports #

from fastapi.encoders   import jsonable_encoder
from fastapi.responses  import JSONResponse
from psycopg2.extras    import RealDictRow
from fastapi            import HTTPException, Body, Depends
from passlib.context    import CryptContext


# ------------- #
# Local imports #

from utils.auth.model       import (
        UserSignupSchema, UserLoginSchema, JWTPayloadSchema
        )
from utils.auth.model       import PostSchema
from utils.auth.auth_bearer import JWTBearer
from utils.auth.auth_handler    import signJWT, decodeJWT

from utils.datastructures       import logger, database
from utils.endpoints.lab_methods    import (
        lab_user_get_token,
        lab_get_roleid,
        lab_create_user,
        )

from .core                   import app




# --------- #
# CONSTANTS #

TAGS:List = [
        "DEBUG",
        ]

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

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

@app.get("/api/database/get_all_users", tags=TAGS)
async def get_all_users():
    users:list[RealDictRow] | None = await database.test.get_all_users()
    return JSONResponse(
            status_code=200,
            # 'jsonable_encoder' fixes problem when JSONResponse cant
            # parse python datetime.date object into string.
            content=jsonable_encoder(users),
            )


@app.get("/api/database/get_user_projects",
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


@app.get("/api/database/add_user_checklog",
         dependencies=[Depends(JWTBearer())],
         tags=TAGS)
async def lab_add_checklog(
        lab_id:str,
        payload:JWTPayloadSchema=Depends(JWTBearer()),
        ):

    user_email:str = payload.email

    if payload is None:
        # Invalid or expired token.
        raise HTTPException(
                status_code=403, detail="Invalid or expired token.")

    # user_projects:list[RealDictRow]|None \
    #         = await database.test.get_user_projects(user_email)

    passed = True
    checklog = {
            "First":True,
            "Second":True,
            "Third":True,
            }

    result:bool = await database.lab.add_user_checklog(
            user_email, lab_id, passed, checklog)

    return JSONResponse(
            status_code=200,
            # 'jsonable_encoder' fixes problem when JSONResponse cant
            # parse python datetime.date object into string.
            content=jsonable_encoder(result),
            )


@app.get("/api/database/get_user_checklogs",
         dependencies=[Depends(JWTBearer())],
         tags=TAGS)
async def get_user_checklogs(
        lab_id:str,
        payload:JWTPayloadSchema=Depends(JWTBearer()),
        ):

    user_email:str = payload.email

    if payload is None:
        # Invalid or expired token.
        raise HTTPException(
                status_code=403, detail="Invalid or expired token.")


    result:list[RealDictRow]|None = await database.lab.get_user_checklogs(
            user_email, lab_id)

    return JSONResponse(
            status_code=200,
            # 'jsonable_encoder' fixes problem when JSONResponse cant
            # parse python datetime.date object into string.
            content=jsonable_encoder(result),
            )


@app.get("/api/lab/get_role_id",
         tags=TAGS)
async def get_roleid(
        role_name:str,
        ):
    
    port = 3080
    token:str = lab_user_get_token(port)
    role_id:str|None = await lab_get_roleid(
            token, port, role_name=role_name)
    return JSONResponse(
            status_code=200,
            # 'jsonable_encoder' fixes problem when JSONResponse cant
            # parse python datetime.date object into string.
            content=jsonable_encoder(role_id),
            )


@app.get("/api/lab/create_lab_user",
         dependencies=[Depends(JWTBearer())],
         tags=TAGS)
async def create_lab_user(
        payload:JWTPayloadSchema=Depends(JWTBearer()),
        ):
    
    user_email:str = payload.email
    port = 3080
    token:str = lab_user_get_token(port)

    # Does creds for that user already exis?
    creds:RealDictRow|None = await database.lab.get_user_lab_creds(user_email)
    logger.core.debug(f"Trying to extract lab_user for user. Results: {creds}")
    if creds is None:
        logger.core.debug(f"Lab user not found. Generating new...")
        creds:tuple[str,str]|None = await lab_create_user(
                port, token, user_email)
        logger.core.debug(f"Lab_user generated with result: {creds}")
        if creds is None:
            #TODO: Implement
            logger.core.error(f"Could not create lab creds.")
            # this user may be already created.
            raise Exception
        user_id_lab, password = creds
        # Store into the DB:
        result:bool = await database.lab.add_user_lab_creds(
                user_email,
                user_id_lab,
                password,
                )
        logger.core.debug(f"Newly created lab_user stored: {result}")
    else:
        user_id_lab = creds["user_id_lab"]
        password = creds["password_lab"]


    # PWD ENCRYPT
    # password_hash   = pwd_context.encrypt(password)
    # # Check pwd
    # if pwd_context.verify(plain_password, hashed_db_password):
    #     return True

    return JSONResponse(
            status_code=200,
            # 'jsonable_encoder' fixes problem when JSONResponse cant
            # parse python datetime.date object into string.
            content=jsonable_encoder(
                [
                    user_email,
                    user_id_lab,
                    password,
                    ]),
            )
