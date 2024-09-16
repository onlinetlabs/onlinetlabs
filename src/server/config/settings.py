from functools import lru_cache
from typing import Any
from pydantic import PostgresDsn, ValidationError, field_validator, ValidationInfo
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    ...
    # model_config = SettingsConfigDict(env_file="../.env")

    # APP_TITLE: str = "API"
    # VERSION: str = "1.0.0"

    # DEBUG: bool = True

    # # SERVER_PORT: int
    # # CLIENT_PORT: int

    # # POSTGRES_USER: str
    # # POSTGRES_PASSWORD: str
    # # POSTGRES_HOST: str
    # # POSTGRES_DB: str
    # # POSTGRES_PORT: str
    # # DATABASE_URI: PostgresDsn | None = None

    # @field_validator("DATABASE_URI", mode='before')
    # def assemble_db_connection(cls, v: str | None, values: ValidationInfo) -> Any:
    #     if isinstance(v, str):
    #         return v
    #     return PostgresDsn.build(
    #         scheme="postgresql+asyncpg",
    #         # username=values.data.get("POSTGRES_USER"),
    #         # password=values.data.get("POSTGRES_PASSWORD"),
    #         # host=values.data.get("POSTGRES_HOST"),
    #         # path=values.data.get("POSTGRES_DB") or "",
    #         # port=values.data.get("POSTGRES_PORT") or 5432,
    #         username= "user",
    #         password= "password",
    #         host= "localhost",
    #         # path= "",
    #         port= 5432,
    #     )


try:
    Settings()
except ValidationError as exc:
    print(repr(exc.errors()[0]['type']))


@lru_cache
def get_settings():
    return Settings()


settings = get_settings()
