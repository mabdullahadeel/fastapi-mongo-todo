from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends
from app.models.todo.todo import Todo
from app.models.users.user import User
from app.services.todo.todo_service import TodoService
from app.api.deps.user_deps import get_current_user
from app.schemas.todo_schema import TodoOut, TodoUpdate, TodoCreate

todo_router = APIRouter()


@todo_router.get('/', summary='Get all todos', response_model=List[TodoOut])
async def list(current_user: User = Depends(get_current_user)):
    return await TodoService.list_todos(current_user)


@todo_router.post('/', summary='Create a todo', response_model=Todo)
async def create(data: TodoCreate, current_user: User = Depends(get_current_user)):
    return await TodoService.create_todo(current_user, data)


@todo_router.get('/{todo_id}', summary='Get a todo', response_model=TodoOut)
async def retrieve(todo_id: UUID, current_user: User = Depends(get_current_user)):
    return await TodoService.retrieve_todo(current_user, todo_id)


@todo_router.put('/{todo_id}', summary='Update a todo', response_model=TodoOut)
async def update(todo_id: UUID, data: TodoUpdate, current_user: User = Depends(get_current_user)):
    return await TodoService.update_todo(current_user, todo_id, data)


@todo_router.delete('/{todo_id}', summary='Delete a todo', status_code=204)
async def delete_todo(todo_id: UUID, current_user: User = Depends(get_current_user)):
    await TodoService.delete_todo(current_user, todo_id)
    return None
