"""Extension management API routes."""

from fastapi import APIRouter, HTTPException, Request

from core.models import ExtensionResponse, ExtensionStatus

router = APIRouter()


@router.get("/", response_model=list[ExtensionResponse])
async def list_extensions(request: Request) -> list[ExtensionResponse]:
    """List all registered extensions."""
    extensions = getattr(request.app.state, "extensions", {})
    return [
        ExtensionResponse(
            name=ext.name,
            version=ext.version,
            status=ExtensionStatus.ACTIVE if ext.is_active else ExtensionStatus.INACTIVE,
            description=ext.description,
        )
        for ext in extensions.values()
    ]


@router.get("/{name}/status", response_model=ExtensionResponse)
async def extension_status(name: str, request: Request) -> ExtensionResponse:
    """Get status of a specific extension."""
    extensions = getattr(request.app.state, "extensions", {})
    if name not in extensions:
        raise HTTPException(status_code=404, detail=f"Extension '{name}' not found")
    ext = extensions[name]
    return ExtensionResponse(
        name=ext.name,
        version=ext.version,
        status=ExtensionStatus.ACTIVE if ext.is_active else ExtensionStatus.INACTIVE,
        description=ext.description,
    )
