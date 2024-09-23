# -------------- #
# System imports #

from typing             import List

# ------------------- #
# Third party imports #

from fastapi.encoders   import jsonable_encoder
from fastapi.responses  import JSONResponse
from psycopg2.extras    import RealDictRow


# ------------- #
# Local imports #

from utils.datastructures       import logger, database

from .core                   import app




# --------- #
# CONSTANTS #

TAGS:List = [
        "test",
        ]


# ------- #
# OBJECTS #


# --------- #
# FUNCTIONS #


# ------- #
# CLASSES #


# ---- #
# MAIN #


#########
# TESTS #
#########

# DATABASE TEST

@app.get("/db_users/get", tags=TAGS)
def get_users_dict():
    users:list[RealDictRow] = database.table_read_users()
    return JSONResponse(
            status_code=200,
            # 'jsonable_encoder' fixes problem when JSONResponse cant
            # parse python datetime.date object into string.
            content=jsonable_encoder(users),
            )
