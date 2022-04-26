from typing import Optional
from uuid import UUID
from app.models.users.user import User
from app.schemas.user_schema import UserAuth
from app.core.security import get_password_hash, verify_password
from app.schemas.user_schema import UserUpdate
import pymongo

class UserService:
    @staticmethod
    async def authenticate(email: str, password: str) -> Optional[User]:
        user = await UserService.get_user_by_email(email)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user
    
    @staticmethod
    async def create_user(user: UserAuth):
        user_in = User(
            username=user.username,
            email=user.email,
            hashed_password=get_password_hash(user.password),
        )
        await user_in.save()
        return user_in
    
    @staticmethod
    async def get_user_by_email(email: str) -> User:
        user = await User.find_one(User.email == email)
        return user
    
    @staticmethod
    async def get_user_by_id(id: UUID) -> User:
        user = await User.find_one(User.user_id == id)
        return user
    
    @staticmethod
    async def update_user(id: UUID, data: UserUpdate) -> User:
        user = await User.find_one(User.user_id == id)
        if not user:
            raise pymongo.errors.OperationFailure("User not found")
        await user.update({"$set": data.dict(exclude_unset=True)})
        return user