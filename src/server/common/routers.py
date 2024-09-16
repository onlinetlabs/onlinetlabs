from typing import Annotated

from fastapi import Depends, APIRouter

from config.settings import Settings, get_settings

router = APIRouter(tags=["common"], prefix="/common")


# async def env(settings: Annotated[Settings, Depends(get_settings)]):
@router.get("/")
async def env():
    return {
        "APP_TITLE": "TITLE",
        "VERSION": "VERSION",
        "DEBUG": "False",
        # "APP_TITLE": settings.APP_TITLE,
        # "VERSION": settings.VERSION,
        # "DEBUG": settings.DEBUG,
        # "POSTGRES_USER": settings.POSTGRES_USER,
        # "POSTGRES_PASSWORD": settings.POSTGRES_PASSWORD,
        # "POSTGRES_DB": settings.POSTGRES_DB,
        # "POSTGRES_HOST": settings.POSTGRES_HOST,
        # "POSTGRES_PORT": settings.POSTGRES_PORT,
        # "DATABASE_URI": str(settings.DATABASE_URI),
        # "SERVER_PORT": settings.SERVER_PORT,
        # "CLIENT_PORT": settings.CLIENT_PORT
    }
