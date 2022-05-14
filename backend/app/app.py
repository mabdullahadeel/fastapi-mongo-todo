from fastapi import FastAPI
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings
from app.api.api_v1.router import api_v1_router

# Database Models
from app.models.users.user import User
from app.models.todo.todo import Todo

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)


@app.on_event("startup")
async def app_init():
    """
    initialize application services
    """
    db_client = AsyncIOMotorClient(settings.MONGO_CONNECTION_STRING).fodoistPrep
    await init_beanie(
        database=db_client,
        document_models=[
            User,
            Todo
        ]
    )


app.include_router(api_v1_router, prefix=settings.API_V1_STR)