import uvicorn

from datetime import datetime, timedelta
from typing import Annotated

from fastapi import FastAPI, Body, Depends, HTTPException, APIRouter

# from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

# Correct 'src' path
# from sys import path as s_path
# from os import path as o_path
# SCRIPT_DIR = o_path.dirname(o_path.abspath(__name__))
# s_path.append(o_path.dirname(SCRIPT_DIR))

from app.model import PostSchema, UserSignupSchema, UserLoginSchema
from app.auth.auth_bearer import JWTBearer
from app.auth.auth_handler import signJWT, decodeJWT

from db_api     import Database

# from common import common_router
# from config.settings import get_settings


posts = [
    {
        "id": 1,
        "title": "Penguins ",
        "text": "Penguins are a group of aquatic flightless birds."
    },
    {
        "id": 2,
        "title": "Tigers ",
        "text": "Tigers are the largest living cat species and a memeber of the genus panthera."
    },
    {
        "id": 3,
        "title": "Koalas ",
        "text": "Koala is arboreal herbivorous maruspial native to Australia."
    },
]

fake_users_db = {

    "johndoe@example.com": {
        "firstname": "John",
        "secondname": "Doe",
        "thirdname": "Markovich",
        "email": "johndoe@example.com",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "disabled": False,
    },

}

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


database = Database()

def on_startup():
    print(f"App startup.")


def create_app():
    app = FastAPI(
        title="APP",
        version="0.0.1",
        docs_url="/api/docs",
        redoc_url="/api/redoc",
        openapi_url="/api/openapi.json",
        # servers=[
        #     # {"url": "https://stag.example.com", "Desc": "Staging env"},
        # ]
        on_startup=on_startup(),
    )

    # api = APIRouter(prefix="/api")

    # api.include_router(common_router)
    # app.include_router(api)

    # app.add_middleware(
    #     CORSMiddleware,
    #     allow_origins=['*'],
    #     allow_credentials=True,
    #     allow_methods=["*"],
    #     allow_headers=["*"],
    #     expose_headers=["*"],
    # )

    return app

app = create_app()


def add_user(db: dict, data: UserSignupSchema) -> None:
    hashed_password = pwd_context.encrypt(data.password)
    db[data.email] = {
        "firstname":        data.firstname,
        "secondname":       data.secondname,
        "thirdname":        data.thirdname,
        "email":            data.email,
        "hashed_password":  hashed_password,
        "disabled": False,
        }
    print(f'DB:\n{db}')

def check_user(db: dict, data: UserLoginSchema|UserSignupSchema):
    # check that user in db
    if data.email in db:
        # check password
        plain_password = data.password
        hashed_password = db[data.email]["hashed_password"]
        if pwd_context.verify(plain_password, hashed_password):
            print(f'DB:\n{db}')
            return True
    return False


# route handlers


# Get Posts
@app.get("/posts", tags=["posts"])
def get_posts():
    return { "data": posts }


@app.get("/posts/{id}", tags=["posts"])
def get_single_post(id: int):
    if id > len(posts):
        return {
            "error": "No such post with the supplied ID."
        }

    for post in posts:
        if post["id"] == id:
            return {
                "data": post
            }


@app.post("/posts", dependencies=[Depends(JWTBearer())], tags=["posts"])
def add_post(post: PostSchema):
    post.id = len(posts) + 1
    posts.append(post.dict())
    return {
        "data": "post added."
    }


@app.post("/api/auth/signup", tags=["user"])
def create_user(user: UserSignupSchema = Body(...)):
    if not check_user(fake_users_db, user):
        add_user(fake_users_db, user)
        access_token = signJWT(user.email, ttl=60)
        refresh_token = signJWT(user.email, ttl=600)

        return {"access_token": access_token, "refresh_token": refresh_token}
    return {
        "error": "User already exists!"
    }


# @app.post("/api/auth/login", tags=["user"], response_model=Token)
@app.post("/api/auth/login", tags=["user"])
def user_login(user: UserLoginSchema = Body(...)):
    if check_user(fake_users_db, user):
        access_token = signJWT(user.email, ttl=60*60*24) # 86400
        refresh_token = signJWT(user.email, ttl=60*60*24*7)     # 604800
        return {"access_token": access_token, "refresh_token": refresh_token}
    return {
        "error": "Wrong login details!"
    }


@app.post("/api/auth/refresh", tags=["user"])
def token_refresh(refresh_token: str):
    payload = decodeJWT(refresh_token)
    if payload:
        access_token = signJWT(payload['user_id'], ttl=86400)
        refresh_token = signJWT(payload['user_id'], ttl=604800)
        return {"access_token": access_token, "refresh_token": refresh_token}
    raise HTTPException(status_code=403, detail="Invalid token or expired token.")



# DATABASE TEST

@app.get("/db_users/get")
def get_single_post():
    users = database.table_read_users()
    return users


@app.post("/posts", dependencies=[Depends(JWTBearer())], tags=["posts"])
def add_post(post: PostSchema):
    post.id = len(posts) + 1
    posts.append(post.dict())
    return {
        "data": "post added."
    }


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
