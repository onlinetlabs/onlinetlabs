from fastapi import FastAPI, APIRouter
from starlette.middleware.cors import CORSMiddleware
from src.common import common_router


def create_app():
    app = FastAPI(
        title="APP",
        version="0.0.1",
        docs_url="/api/docs",
        openapi_url="/api/openapi.json",
    )

    api = APIRouter(prefix="/api")

    api.include_router(common_router)
    app.include_router(api)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=['*'],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["*"],
    )

    return app
