"""Chat API routes."""

import uuid
from datetime import datetime, timezone

from fastapi import APIRouter

from core.models import ChatSendRequest, ChatMessageResponse, MessageRole

router = APIRouter()

# In-memory session store
_sessions: dict[str, list[ChatMessageResponse]] = {}


@router.post("/send", response_model=ChatMessageResponse)
async def send_message(body: ChatSendRequest) -> ChatMessageResponse:
    """Send a chat message and get a response."""
    session_id = body.session_id or str(uuid.uuid4())

    if session_id not in _sessions:
        _sessions[session_id] = []

    # Store user message
    user_msg = ChatMessageResponse(
        id=str(uuid.uuid4()),
        role=MessageRole.USER,
        content=body.message,
        timestamp=datetime.now(timezone.utc),
    )
    _sessions[session_id].append(user_msg)

    # Generate placeholder response (will be replaced by agent runtime)
    assistant_msg = ChatMessageResponse(
        id=str(uuid.uuid4()),
        role=MessageRole.ASSISTANT,
        content=f"Received: {body.message}. Agent runtime integration coming soon!",
        timestamp=datetime.now(timezone.utc),
        metadata={"session_id": session_id},
    )
    _sessions[session_id].append(assistant_msg)

    return assistant_msg


@router.get("/history/{session_id}", response_model=list[ChatMessageResponse])
async def get_history(session_id: str) -> list[ChatMessageResponse]:
    """Get chat history for a session."""
    return _sessions.get(session_id, [])
