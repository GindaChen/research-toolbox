"""Modal preview app — serves frontend + backend for PR previews.

Each PR gets its own Modal environment (pr-{number}), serving:
- Static frontend (Vite build) at /
- FastAPI backend at /api/*

Usage:
  modal deploy deploy/preview_app.py --env pr-42
  modal serve deploy/preview_app.py  # local dev
"""

import modal
import os

# ── Modal image: Node 20 for frontend build + Python 3.11 for backend ──
image = (
    modal.Image.debian_slim(python_version="3.11")
    .apt_install("curl")
    .run_commands(
        # Install Node.js 20
        "curl -fsSL https://deb.nodesource.com/setup_20.x | bash -",
        "apt-get install -y nodejs",
    )
    .pip_install("fastapi[standard]", "uvicorn", "pydantic", "pydantic-settings")
    # Copy the repo into the image (filtered by .modalignore)
    .add_local_dir(".", "/app")
    # Build frontend inside the image
    .run_commands(
        "cd /app/frontend && npm install --prefer-offline --no-audit && npm run build",
    )
)

app = modal.App("rt-preview")


@app.function(
    image=image,
    allow_concurrent_inputs=100,
    container_idle_timeout=300,  # 5 min idle before sleep
)
@modal.asgi_app()
def web():
    """Serve the full-stack app: frontend static files + backend API."""
    import sys
    sys.path.insert(0, "/app/backend")

    from fastapi import FastAPI
    from fastapi.staticfiles import StaticFiles
    from fastapi.responses import FileResponse

    # Import backend routers
    from api.tasks import router as tasks_router
    from api.chat import router as chat_router
    from api.extensions import router as extensions_router

    preview_app = FastAPI(
        title="Research Toolbox Preview",
        docs_url="/api/docs",
        openapi_url="/api/openapi.json",
    )

    # ── Health check ──
    @preview_app.get("/api/health")
    def health():
        env = os.environ.get("MODAL_ENVIRONMENT", "unknown")
        return {"status": "ok", "environment": env, "preview": True}

    # ── Backend API routes ──
    preview_app.include_router(tasks_router, prefix="/api")
    preview_app.include_router(chat_router, prefix="/api")
    preview_app.include_router(extensions_router, prefix="/api")

    # ── Frontend static files ──
    # Serve index.html for all non-API routes (SPA routing)
    @preview_app.get("/{path:path}")
    async def serve_spa(path: str):
        import pathlib
        static_dir = pathlib.Path("/app/frontend/dist")
        file_path = static_dir / path
        if file_path.is_file():
            return FileResponse(file_path)
        return FileResponse(static_dir / "index.html")

    # Mount static assets
    preview_app.mount(
        "/assets",
        StaticFiles(directory="/app/frontend/dist/assets"),
        name="assets",
    )

    return preview_app
