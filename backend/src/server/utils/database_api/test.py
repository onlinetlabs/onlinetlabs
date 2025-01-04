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


class APITest(APIInterface):
    """
    """

    async def test_get_users(self) -> list[RealDictRow]|None:
        """
        """

        cmd = f"SELECT * FROM USERS;"
        response = await self.query(cmd)
        return response



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
