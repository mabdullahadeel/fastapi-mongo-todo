from fastapi import APIRouter
from app.api.api_v1.handlers.users import user

api_v1_router = APIRouter()

api_v1_router.include_router(user.user_router, prefix="/users", tags=["users"])
