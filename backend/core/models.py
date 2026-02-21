"""Pydantic models for API request/response validation."""

from datetime import datetime
from enum import Enum
from pydantic import BaseModel, Field


# ── Task Models ──

class TaskStatus(str, Enum):
    BACKLOG = "backlog"
    TODO = "todo"
    IN_PROGRESS = "in-progress"
    REVIEW = "review"
    DONE = "done"


class TaskPriority(str, Enum):
    P0_CRITICAL = "p0-critical"
    P1_HIGH = "p1-high"
    P2_MEDIUM = "p2-medium"
    P3_LOW = "p3-low"


class TaskCreate(BaseModel):
    title: str
    description: str = ""
    status: TaskStatus = TaskStatus.BACKLOG
    priority: TaskPriority = TaskPriority.P2_MEDIUM
    labels: list[str] = Field(default_factory=list)
    assignee: str | None = None
    estimated_hours: float | None = None


class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    status: TaskStatus | None = None
    priority: TaskPriority | None = None
    labels: list[str] | None = None
    assignee: str | None = None
    estimated_hours: float | None = None


class TaskResponse(BaseModel):
    id: str
    title: str
    description: str
    status: TaskStatus
    priority: TaskPriority
    labels: list[str]
    assignee: str | None
    estimated_hours: float | None
    created_at: datetime
    updated_at: datetime


# ── Chat Models ──

class MessageRole(str, Enum):
    USER = "user"
    ASSISTANT = "assistant"
    SYSTEM = "system"


class ChatSendRequest(BaseModel):
    message: str
    session_id: str | None = None


class ChatMessageResponse(BaseModel):
    id: str
    role: MessageRole
    content: str
    timestamp: datetime
    metadata: dict | None = None


# ── Extension Models ──

class ExtensionStatus(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    ERROR = "error"


class ExtensionResponse(BaseModel):
    name: str
    version: str
    status: ExtensionStatus
    description: str


# ── Journey Models ──

class JourneyEntryCreate(BaseModel):
    title: str
    summary: str
    conversation_id: str | None = None
    tags: list[str] = Field(default_factory=list)


class JourneyEntryResponse(BaseModel):
    id: str
    title: str
    summary: str
    conversation_id: str | None
    tags: list[str]
    created_at: datetime
