# -------------- #
# System imports #


# ------------------- #
# Third party imports #

from fastapi            import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ------------- #
# Local imports #

from utils.datastructures       import logger


# --------- #
# CONSTANTS #


# ------- #
# OBJECTS #


# --------- #
# FUNCTIONS #


def create_app():
    """
        Create FastAPI app object.
    """

    app = FastAPI(
        title="APP",
        version="0.0.1",
        docs_url="/api/docs",
        redoc_url="/api/redoc",
        openapi_url="/api/openapi.json",
        # servers=[
        #     # {"url": "https://stag.example.com", "Desc": "Staging env"},
        # ]
    )

    # api = APIRouter(prefix="/api")

    # api.include_router(common_router)
    # app.include_router(api)

    # origins = [
    #     "http://localhost",
    #     "http://localhost:3000",
    # ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=['*'],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["*"],
    )

    return app

app = create_app()

@app.on_event("startup")
def on_startup():
    """
        Called once at fastapi app start.
    """

    logger.core.info(f"App startup.")


# ------- #
# CLASSES #


# ---- #
# MAIN #
