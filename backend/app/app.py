from unicodedata import name
from fastapi import FastAPI
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

# Database Models
from app.models.users.user import User

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)


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


from app.api.api_v1.router import api_v1_router

app.include_router(api_v1_router, prefix=settings.API_V1_STR)