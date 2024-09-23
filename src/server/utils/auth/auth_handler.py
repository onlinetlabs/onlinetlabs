# This file is responsible for signing , encoding , decoding and returning JWTS (JSON Web Tokens)

# -------------- #
# System imports #

import time


# ------------------- #
# Third party imports #

import jwt
from decouple               import config

# ------------- #
# Local imports #

from utils.datastructures   import logger


JWT_SECRET:str = config("JWT_SECRET", cast=str)
JWT_ALGORITHM:str = config("JWT_ALGORITHM", cast=str)


# function used for signing the JWT string
def signJWT(user_id: str, ttl: int) -> str:
    """
        The signJWT function is used to create (or "sign") a JWT for
        a specific user. It takes a user ID and a time-to-live (TTL)
        value as inputs and returns a signed JWT string.
        
        - user_id: A string representing the unique identifier of the
        user for whom the token is being created.
        - ttl: An integer representing the time-to-live in seconds for
        the token. This determines how long the token will be valid before
        it expires.

        The function returns the signed JWT as a string.
    """

    payload = {
        "user_id": user_id,
        "expires": time.time() + ttl
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return token


def decodeJWT(token: str) -> dict|None:
    """
        The decodeJWT function is used to verify and decode a given JWT.
        It checks if the token is valid and not expired, returning the
        decoded payload if everything is correct.

        - token: A string representing the JWT that needs to be decoded
        and verified.
    """

    try:
        decoded_token = jwt.decode(
                token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return decoded_token if decoded_token["expires"] > time.time() else None
    except Exception as e:
        logger.core.error(f"Cant decode JWT:\n{token}.\nGot exception:\n{e}")
        return None
