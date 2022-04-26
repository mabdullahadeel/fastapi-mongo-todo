from fastapi import APIRouter
from app.api.api_v1.handlers.users import user
from app.api.api_v1.handlers.todo import todo
from app.api.auth.jwt import auth_router

api_v1_router = APIRouter()

api_v1_router.include_router(user.user_router, prefix="/users", tags=["users"])
api_v1_router.include_router(todo.todo_router, prefix="/todo", tags=["todos"])
api_v1_router.include_router(auth_router, prefix="/auth", tags=["auth"])