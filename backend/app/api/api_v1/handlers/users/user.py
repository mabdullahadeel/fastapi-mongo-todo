from fastapi import APIRouter, HTTPException, status, Depends
import pymongo
from app.services.user.user_service import UserService
from app.schemas.user_schema import UserAuth, UserOut, UserUpdate
from app.api.deps.user_deps import get_current_user
from app.models.users.user import User

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


@user_router.get("/me", summary="Get user by email", response_model=UserOut)
def get_me(user: User = Depends(get_current_user)):
    return user


@user_router.patch("/update", summary="Update user by email", response_model=UserOut)
async def update_user(data: UserUpdate, user: User = Depends(get_current_user)):
    try:
        return await UserService.update_user(user.user_id, data)
    except pymongo.errors.OperationFailure:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email does not exist"
        )