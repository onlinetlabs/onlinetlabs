# -------------- #
# System imports #

import asyncio
import datetime


# ------------------- #
# Third party imports #

import psycopg2
from psycopg2.extras    import RealDictRow
from passlib.context    import CryptContext


# ------------- #
# Local imports #

from utils.auth.model       import UserSignupSchema, UserLoginSchema
from .APIInterface          import APIInterface


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


###########
# CLASSES #
###########


class APITest(APIInterface):
    """
    """

    # async def signup(self,
    #         user:UserSignupSchema) -> bool:
    #     name            = user.firstname
    #     surname         = user.secondname
    #     email           = user.email
    #     password_hash   = pwd_context.encrypt(user.password)
    #     role            = "student"
    #     # created_at       = '2024-06-17' # TIMESTAMP
    #     # created_at       = datetime.datetime.now()
    #     last_seen       = datetime.datetime.now()

    #     password_hash = str(password_hash)

    #     cmd = f"""
    #     INSERT INTO users (name, surname, email, password_hash, role, last_seen)
    #     VALUES ('{name}', '{surname}', '{email}', '{password_hash}', '{role}', '{last_seen}');"""
    #     try:
    #         response = await self.query(cmd)
    #         # In case of success 'response' is None
    #         return True
    #     except psycopg2.errors.UniqueViolation:
    #         # email or username already exists
    #         return False


    async def get_all_users(self) -> list[RealDictRow]|None:
        """
        """

        cmd = f"SELECT * FROM USERS;"
        response = await self.query(cmd)
        if response is not None and len(response) > 0:
            return response
        return None


    async def get_user_projects(self, user_email:str) -> list[RealDictRow]|None:
        """
        """

        cmd = f"SELECT up.lab_id, up.project_id, up.created_at FROM user_projects up JOIN users u ON up.user_id = u.id WHERE u.email = '{user_email}';"
        response = await self.query(cmd)
        if response is not None and len(response) > 0:
            return response
        return None
