"""Research Toolbox Backend — FastAPI Application."""

from contextlib import asynccontextmanager
from collections.abc import AsyncIterator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.tasks import router as tasks_router
from api.chat import router as chat_router
from api.extensions import router as extensions_router
from extensions import discover_extensions


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Startup/shutdown lifecycle."""
    # Discover and register extensions
    app.state.extensions = discover_extensions()
    for ext in app.state.extensions.values():
        await ext.setup()
    yield
    for ext in app.state.extensions.values():
        await ext.teardown()


app = FastAPI(
    title="Research Toolbox API",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks_router, prefix="/api/tasks", tags=["tasks"])
app.include_router(chat_router, prefix="/api/chat", tags=["chat"])
app.include_router(extensions_router, prefix="/api/extensions", tags=["extensions"])


@app.get("/api/health")
async def health() -> dict[str, str]:
    """Health check endpoint."""
    return {"status": "ok", "version": "0.1.0"}
