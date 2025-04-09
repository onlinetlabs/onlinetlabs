# -------------- #
# System imports #

import asyncio
from enum               import Enum
from typing             import List


# ------------------- #
# Third party imports #

from decouple           import config
from fastapi            import HTTPException, Body, Depends
from fastapi.encoders   import jsonable_encoder
from fastapi.responses  import JSONResponse
from passlib.context    import CryptContext
from psycopg2.extras    import RealDictRow


# ------------- #
# Local imports #

from utils.auth.model       import (
        UserSignupSchema, UserLoginSchema, JWTPayloadSchema
        )
from utils.auth.model       import PostSchema
from utils.auth.auth_bearer import JWTBearer
from utils.auth.auth_handler    import signJWT, decodeJWT

from utils.datastructures       import logger, database
from utils.auth.model           import Token

from .core                   import app




# --------- #
# CONSTANTS #

TAGS:list[str|Enum]|None = [
        "AUTH",
        ]

# Access token time to life (set in .env)
JWT_ACC_TTL = config("JWT_ACC_TTL", cast=int)
# Refresh token time to life
JWT_REF_TTL = config("JWT_REF_TTL", cast=int)

# ------- #
# OBJECTS #

# Used to check if provided password matches
# password_hash stored in the DB.
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# --------- #
# FUNCTIONS #

# USER SIGNUP/LOGIN FUNCTIONS

async def user_password_correct(user:UserLoginSchema) -> bool:
    # Request DB to get user.
    user_db = await database.auth.get_user_by_email(user)
    if user_db is None: return False
    # check password
    plain_password = user.password
    hashed_db_password = user_db["password_hash"]
    if pwd_context.verify(plain_password, hashed_db_password):
        return True
    return False


# ------- #
# CLASSES #


# ---- #
# MAIN #

##################
# AUTHENTICATION #
##################

@app.post("/api/auth/signup", tags=TAGS, response_model=Token)
async def user_create(user: UserSignupSchema = Body(...)) -> Token:
    """
        Accepts request of type 'UserSignupSchema' and
        returns access and refresh token if user was not created
        before.
    """

    # Check user.email is unique:
    user_db = await database.auth.get_user_by_email(user)
    if user_db is not None:
        raise HTTPException(
                status_code=400,
                detail="User already exists. Try to login.")
    
    # Write new user into the DB.
    success:bool = await database.auth.signup(user)
    if not success:
        logger.main.error(f"Cant signup user: {user.email} {user.secondname}")
    else:
        logger.main.debug(f"User signed up: {user.email} {user.secondname}")

    # Create and return access and refresh tokens.
    access_token = signJWT(user.email, ttl=JWT_ACC_TTL)
    refresh_token = signJWT(user.email, ttl=JWT_REF_TTL)
    token = Token(
            access_token=access_token,
            refresh_token=refresh_token,
            )
    return token


@app.post("/api/auth/login", tags=TAGS, response_model=Token)
async def user_login(user: UserLoginSchema = Body(...)) -> Token:
    """
        Accepts request of type 'UserLoginSchema' and
        returns access and refresh token if credentials are
        correct.
    """

    if not await user_password_correct(user):
        # User entered wrong/non-existing (in DB)
        # login-password combination.
        raise HTTPException(
                status_code=403, detail="Login or password incorrect.")

    # User entered correct password, create and return token.
    access_token:str = signJWT(user.email, ttl=JWT_ACC_TTL)
    refresh_token:str = signJWT(user.email, ttl=JWT_REF_TTL)
    token = Token(
            access_token=access_token,
            refresh_token=refresh_token,
            )
    return token


@app.post("/api/auth/refresh", tags=TAGS, response_model=Token)
async def token_refresh(refresh_token: str) -> Token:
    """
        Accepts request of type 'str' - token and
        returns access and refresh token if the token is
        correct and didn't expired.
    """

    # Try to extract user data from token (user_email, expires).
    payload:JWTPayloadSchema = decodeJWT(refresh_token)

    if payload is None:
        # Invalid or expired token.
        raise HTTPException(
                status_code=403, detail="Invalid or expired token.")

    # If refresh token is valid - generate and return new tokens pair.
    access_token = signJWT(payload.email, ttl=JWT_ACC_TTL)
    refresh_token = signJWT(payload.email, ttl=JWT_REF_TTL)
    token = Token(
            access_token=access_token,
            refresh_token=refresh_token,
            )
    return token
