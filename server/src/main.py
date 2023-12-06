import uvicorn
from src.app import create_app
from src.config.settings import get_settings


app = create_app()

if get_settings().DEBUG:
    uvicorn.run(app, host="0.0.0.0", port=get_settings().SERVER_PORT or 8000)