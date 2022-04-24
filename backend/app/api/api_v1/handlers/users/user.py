from fastapi import APIRouter, HTTPException, status, Body
from pydantic import EmailStr
import pymongo
from app.services.user.user_service import UserService
from app.schemas.user_schema import UserAuth, UserOut, UserUpdate

user_router = APIRouter()


@user_router.post("/create", summary="Create new user", response_model=UserOut)
async def create_user(data: UserAuth):
    try:
        return await UserService.create_user(data)
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this username or email already exists"
        )


@user_router.get("/get", summary="Get user by email", response_model=UserOut)
async def get_user_by_email(email: EmailStr):
    try:
        user = await UserService.get_user_by_email(email)
        if not user:
            raise pymongo.errors.OperationFailure("User not found")
        return user
    except pymongo.errors.OperationFailure:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email does not exist"
        )
        

@user_router.put("/update", summary="Update user by email", response_model=UserOut)
async def update_user(email: str, data: UserUpdate):
    try:
        return await UserService.update_user(email, data)
    except pymongo.errors.OperationFailure:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email does not exist"
        )