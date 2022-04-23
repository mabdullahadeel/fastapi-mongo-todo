from unicodedata import name
from fastapi import FastAPI
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

# Database Models
from app.models.users.user import User

app = FastAPI()


@app.on_event("startup")
async def app_init():
    """
    initialize application services
    """
    db_client = AsyncIOMotorClient(settings.MONGO_CONNECTION_STRING).fodoist
    await init_beanie(
        database=db_client,
        document_models=[
            User
        ]
    )