from fastapi import APIRouter

user_router = APIRouter()


@user_router.get("/me", summary="get current user")
async def test_user():
  return {"username": "abdullah"}