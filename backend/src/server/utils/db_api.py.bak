# -------------- #
# System imports #

import asyncio
import os
from typing         import Self
from types          import TracebackType


# ------------------- #
# Third party imports #

import psycopg2
from psycopg2.extras import RealDictCursor, RealDictRow
from passlib.context import CryptContext


# ------------- #
# Local imports #

from .auth.model      import UserSignupSchema, UserLoginSchema


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


###########
# CLASSES #
###########


class Database:


    def __init__(self,
                 db_name:str|None=None,
                 db_user:str|None=None,
                 db_pass:str|None=None,
                 db_host:str|None=None,
                 db_port:str|None=None,
                 *args, **kwargs) -> None:
        """ Creates object to manipulate one particular DB.
            
            Parameters:

            : db_name - Name of the database to connect to. Example: "myDB";
            : db_user - User whihc has access to the DB. Example: "user";
            : db_pass - User password;
            : db_host - Host (or IP addr) of the DB. Example: "localhost";
            : db_port - Port of the DB. Example: "5432".
        """
        
        self._get_db_parameters(
                db_name,
                db_user,
                db_pass,
                db_host,
                db_port,
                )
        self.connection = self._db_create_connection()
        self.cursor     = self._db_create_cursor()


    # RealDictRow is like python dict
    def table_read_users(self) -> list[RealDictRow]:
        print("Called: table_read_users")
        cmd = f"SELECT * FROM USERS;"
        self.cursor.execute(cmd)
        rows = self.cursor.fetchall()
        print(f"Got {len(rows)} entries from table 'USERS':")
        for row in rows:
            print(row)

        print("\n")
        return rows

    def table_get_user(self,
                       user:UserSignupSchema|UserLoginSchema
                ) -> RealDictRow|None:
        cmd = f"SELECT * FROM USERS WHERE email = '{user.email}';"
        self.cursor.execute(cmd)
        user_db = self.cursor.fetchall()
        print(f"Found user: {user_db}")
        if len(user_db) == 0:
            return None
        # TODO: 'users' should be only one.
        return user_db[0]


    def table_add_user(self, user:UserSignupSchema) -> bool:
        name            = user.firstname
        surname         = user.secondname
        email           = user.email
        password_hash   = pwd_context.encrypt(user.password)
        role            = "student"
        last_seen       = '2024-06-17'

        print(password_hash)
        print(type(password_hash))
        password_hash = str(password_hash)

        cmd = f"""
        INSERT INTO users (name, surname, email, password_hash, role, last_seen)
        VALUES ('{name}', '{surname}', '{email}', '{password_hash}', '{role}', '{last_seen}');"""
        try:
            self.cursor.execute(cmd)
            self.commit()
            return True
        except Exception:
            print(f"error")
            return False


    def commit(self) -> None:
        """ If you have made changes to the database
        (e.g., insert, update, delete), you need to commit
        the transaction.
        """

        self.connection.commit()


    def _get_db_parameters(self,
            db_name:str|None,
            db_user:str|None,
            db_pass:str|None,
            db_host:str|None,
            db_port:str|None,
            ):
        """ Finds all necessary parameters needed to create
            connection to the PostgreSQL database.
            
            Parameters:

            : db_name - Name of the database to connect to. Example: "myDB";
            : db_user - User whihc has access to the DB. Example: "user";
            : db_pass - User password;
            : db_host - Host (or IP addr) of the DB. Example: "localhost";
            : db_port - Port of the DB. Example: "5432".
        """

        # If parameter not given in constructor -
        # Retreive it from ENV:
        # DB_NAME
        if not db_name:
            self.DB_NAME = os.getenv('POSTGRES_DB')
        else:
            self.DB_NAME = db_name
        # DB_USER
        if not db_user:
            self.DB_USER = os.getenv('POSTGRES_USER')
        else:
            self.DB_USER = db_user
        # DB_PASSWORD
        if not db_pass:
            self.DB_PASS = os.getenv('POSTGRES_PASSWORD')
        else:
            self.DB_PASS = db_pass
        # DB_HOST
        if not db_host:
            self.DB_HOST = os.getenv('POSTGRES_HOST')
        else:
            self.DB_HOST = db_host
        # DB_PORT
        if not db_port:
            self.DB_PORT = os.getenv('POSTGRES_PORT')
        else:
            self.DB_PORT = db_port

        # Check that all parameters are correct:
        # If not - exception will be raised.
        self._check_db_parameters()


    def _check_db_parameters(self) -> None:
        """ Checks that db parameters are not None and not empty.
            
            Parameters to check:

            : self.DB_NAME - Name of the database to connect to. Example: "myDB";
            : self.DB_USER - User whihc has access to the DB. Example: "user";
            : self.DB_PASS - User password;
            : self.DB_HOST - Host (or IP addr) of the DB. Example: "localhost";
            : self.DB_PORT - Port of the DB. Example: "5432".
        """

        if not self.DB_NAME or not self.DB_USER or not self.DB_PASS \
                or not self.DB_HOST or not self.DB_PORT:
            # raise Exception("Not all parameters are given!")
            print("Not all parameters are given!")

        
    # Create connection
    def _db_create_connection(self):
        """ Establishing a Connection to the PostgreSQL database. """

        conn = psycopg2.connect(
            dbname  = self.DB_NAME,
            user    = self.DB_USER,
            password= self.DB_PASS,
            host    = self.DB_HOST,
            port    = self.DB_PORT,
        )
        return conn


    def _db_create_cursor(self):
        """ A cursor is used to interact with the database. """

        if hasattr(self, "connection"):
            # cursor = self.connection.cursor()
            cursor = self.connection.cursor(cursor_factory=RealDictCursor)
            return cursor
        else:
            print("Cant create cursor!")
            raise Exception


    def __enter__(self) -> Self:
        return self
    def __exit__(
            self,
            exc_type: type[BaseException] | None,
            exc_val: BaseException | None,
            exc_tb: TracebackType | None,
            ) -> None:
        self.cursor.close()
        self.connection.close()
        return
    async def __aenter__(self) -> Self:
        return self
    async def __aexit__(
            self,
            exc_type: type[BaseException] | None,
            exc_val: BaseException | None,
            exc_tb: TracebackType | None,
            ) -> None:
        self.cursor.close()
        self.connection.close()
        return


########
# MAIN #
########

user_schema = UserSignupSchema(
    firstname="123",
    secondname="321",
    email="example@mail.ru",
    password="",
    disabled=False)

async def main():

    async with Database() as db:
        db.table_read_users()
        while True:
            # db.table_add_user()
            # db.table_read_users()
            user = db.table_get_user(user_schema)
            print(user)
            input(f"Make new entry:> ")


if __name__ == "__main__":
    asyncio.run(main())
