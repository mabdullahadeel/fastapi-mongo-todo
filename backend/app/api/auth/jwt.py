from typing import Any

from pydantic import ValidationError

from app.core.security import create_access_token, create_refresh_token
from app.schemas.token_schema import TokenSchema
from app.schemas.user_schema import UserOut
from app.services.user.user_service import UserService
from fastapi import APIRouter, Depends, HTTPException, status, Body
from fastapi.security import OAuth2PasswordRequestForm
from app.api.deps.user_deps import get_current_user
from jose import jwt
from app.core.security import settings

from app.models.users.user import User
from app.schemas.token_schema import TokenPayload
from app.services.user import user_service


auth_router = APIRouter()


@auth_router.post('/login', response_model=TokenSchema)
async def login(form_data: OAuth2PasswordRequestForm = Depends()) -> Any:
    user = await UserService.authenticate(email=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password",
        )
    
    return {
        "access_token": create_access_token(user.user_id),
        "refresh_token": create_refresh_token(user.user_id),
    }


@auth_router.post('/test-token', response_model=UserOut)
def test_token(user: User = Depends(get_current_user)):
    return user


@auth_router.post('/refresh', response_model=TokenSchema)
async def refresh_token(refresh_token: str = Body(...)):
    try:
        payload = jwt.decode(
            refresh_token, settings.JWT_REFRESH_SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        token_data = TokenPayload(**payload)
    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = await user_service.UserService.get_user_by_id(token_data.sub)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invalid token for user",
        )
    return {
        "access_token": create_access_token(user.user_id),
        "refresh_token": create_refresh_token(user.user_id),
    }