from pydantic import EmailStr
from app.models.users.user import User
from app.schemas.user_schema import UserAuth
from app.core.security import get_password_hash
from app.schemas.user_schema import UserUpdate
import pymongo

class UserService:
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
    async def update_user(email: EmailStr, data: UserUpdate) -> User:
        user = await User.find_one(User.email == email)
        if not user:
            raise pymongo.errors.OperationFailure("User not found")
        await user.update({"$set": data.dict(exclude_unset=True)})
        return user