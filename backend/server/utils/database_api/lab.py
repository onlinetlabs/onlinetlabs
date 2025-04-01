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


class APILab(APIInterface):
    """
    """

    async def get_user_projects(self, user_email:str) -> list[RealDictRow]|None:
        """
        Get all user projects.
        """

        cmd = f"""
        SELECT up.lab_id, up.project_id, up.created_at
        FROM user_projects up JOIN users u ON up.user_id = u.id
        WHERE u.email = '{user_email}';
        """
        response = await self.query(cmd)
        if response is not None and len(response) > 0:
            return response
        return None


    async def get_user_project(
            self, user_email:str,
            lab_id:str,
            ) -> str|None:
        """
        Get user project by lab_id. If absent - return None
        """

        cmd = f"""
        SELECT up.lab_id, up.project_id, up.created_at
        FROM user_projects up JOIN users u ON up.user_id = u.id
        WHERE u.email = '{user_email}' AND up.lab_id = '{lab_id}';
        """
        response = await self.query(cmd)
        if response is not None and len(response) > 0:
            return response[0]["project_id"]
        return None


    async def add_user_project(
            self,
            user_email:str,
            lab_id:str,
            project_id:str,
            ) -> bool:
        """
        Add project for user.
        """

        cmd = f"""
        INSERT INTO user_projects (user_id, lab_id, project_id)
        SELECT id, '{lab_id}', '{project_id}'
        FROM users
        WHERE email = '{user_email}'
        """

        try:
            response = await self.query(cmd)
            # In case of success 'response' is None
            return True
        # except psycopg2.errors.UniqueViolation:
        except Exception as e:
            # email or username already exists
            return False


    async def del_user_project(
            self,
            user_email:str,
            project_id:str,
            ) -> bool:
        """
        Add project for user.
        """

        cmd = f"""
        DELETE FROM user_projects WHERE project_id = '{project_id}'
        """
        try:
            response = await self.query(cmd)
            # In case of success 'response' is None
            return True
        # except psycopg2.errors.UniqueViolation:
        except Exception as e:
            # email or username already exists
            return False
