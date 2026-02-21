"""Task (Kanban) API routes."""

import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException

from core.models import TaskCreate, TaskUpdate, TaskResponse

router = APIRouter()

# In-memory store (replace with DB later)
_tasks: dict[str, TaskResponse] = {}


@router.get("/", response_model=list[TaskResponse])
async def list_tasks() -> list[TaskResponse]:
    """List all tasks."""
    return list(_tasks.values())


@router.post("/", response_model=TaskResponse, status_code=201)
async def create_task(body: TaskCreate) -> TaskResponse:
    """Create a new task."""
    now = datetime.now(timezone.utc)
    task = TaskResponse(
        id=str(uuid.uuid4()),
        title=body.title,
        description=body.description,
        status=body.status,
        priority=body.priority,
        labels=body.labels,
        assignee=body.assignee,
        estimated_hours=body.estimated_hours,
        created_at=now,
        updated_at=now,
    )
    _tasks[task.id] = task
    return task


@router.get("/{task_id}", response_model=TaskResponse)
async def get_task(task_id: str) -> TaskResponse:
    """Get a task by ID."""
    if task_id not in _tasks:
        raise HTTPException(status_code=404, detail="Task not found")
    return _tasks[task_id]


@router.patch("/{task_id}", response_model=TaskResponse)
async def update_task(task_id: str, body: TaskUpdate) -> TaskResponse:
    """Update a task."""
    if task_id not in _tasks:
        raise HTTPException(status_code=404, detail="Task not found")
    existing = _tasks[task_id]
    updates = body.model_dump(exclude_unset=True)
    updated = existing.model_copy(
        update={**updates, "updated_at": datetime.now(timezone.utc)}
    )
    _tasks[task_id] = updated
    return updated


@router.delete("/{task_id}", status_code=204)
async def delete_task(task_id: str) -> None:
    """Delete a task."""
    if task_id not in _tasks:
        raise HTTPException(status_code=404, detail="Task not found")
    del _tasks[task_id]
