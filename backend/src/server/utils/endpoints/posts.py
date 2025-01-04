# -------------- #
# System imports #

from typing             import List

# ------------------- #
# Third party imports #

from fastapi            import Depends


# ------------- #
# Local imports #

from utils.auth.model       import PostSchema
from utils.auth.auth_bearer import JWTBearer


from .core                   import app




# --------- #
# CONSTANTS #

TAGS:List = [
        "posts",
        ]

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


# ------- #
# OBJECTS #


# --------- #
# FUNCTIONS #


# ------- #
# CLASSES #


# ---- #
# MAIN #


# POSTS (CHECK JWT only purpose)

@app.get("/posts", tags=TAGS)
def get_posts():
    return { "data": posts }


@app.get("/posts/{id}", tags=TAGS)
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


@app.post("/posts", dependencies=[Depends(JWTBearer())], tags=TAGS)
def add_post(post: PostSchema):
    post.id = len(posts) + 1
    posts.append(post.model_dump())
    return {
        "data": "post added."
    }
