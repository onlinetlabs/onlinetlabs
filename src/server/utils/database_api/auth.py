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

from utils.auth.model      import UserSignupSchema, UserLoginSchema

from .base       import APIInterface


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


###########
# CLASSES #
###########


class APIAuth(APIInterface):
    """
    """

    async def auth_signup(self,
            user:UserSignupSchema) -> bool:
        name            = user.firstname
        surname         = user.secondname
        email           = user.email
        password_hash   = pwd_context.encrypt(user.password)
        role            = "student"
        # created_at       = '2024-06-17' # TIMESTAMP
        # created_at       = datetime.datetime.now()
        last_seen       = datetime.datetime.now()

        password_hash = str(password_hash)

        cmd = f"""
        INSERT INTO users (name, surname, email, password_hash, role, last_seen)
        VALUES ('{name}', '{surname}', '{email}', '{password_hash}', '{role}', '{last_seen}');"""
        try:
            response = await self.query(cmd)
            # In case of success 'response' is None
            return True
        except psycopg2.errors.UniqueViolation:
            # email or username already exists
            return False


    async def auth_get_user_by_email(self,
            user:UserSignupSchema|UserLoginSchema|str) -> None|RealDictRow:
        """
            Just retreives user from db by email,
            If there is no such user - None is returned.
        """

        if type(user) == str:
            email = user
            cmd = f"SELECT * FROM USERS WHERE email = '{email}';"
        # elif type(user) == UserSignupSchema or type(user) == UserLoginSchema:
        elif isinstance(user, UserSignupSchema) \
                or isinstance(user, UserLoginSchema):
            cmd = f"SELECT * FROM USERS WHERE email = '{user.email}';"
        else:
            return None
        response = await self.query(cmd)
        if response is not None and len(response) > 0:
            return response[0]
        return None


    #TODO: Should be firstname and secondname
    # async def auth_get_user_by_username(self,
    #         user:UserSignupSchema) -> None|RealDictRow:
    #     """
    #         Just retreives user from db by username,
    #         If there is no such user - None is returned.
    #     """

    #     cmd = f"SELECT * FROM USERS WHERE username = '{user.username}';"
    #     response = await self.query(cmd)
    #     if response is not None and len(response) > 0:
    #         return response[0]
    #     return None



########
# MAIN #
########


async def main():

    user= UserSignupSchema(
        username="superultra5",
        email="example5@mail.ru",
        password="FakePassword",
        )

    db = APIAuth()
    response = await db.auth_signup(user)
    print(response)

    pass


if __name__ == "__main__":
    asyncio.run(main())
