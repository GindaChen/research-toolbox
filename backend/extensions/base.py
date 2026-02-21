"""Base class for all Research Toolbox extensions."""

from abc import ABC, abstractmethod


class BaseExtension(ABC):
    """Abstract base class for extensions.

    Every extension must subclass this and implement the required methods.

    Example:
        class MyExtension(BaseExtension):
            name = "my-extension"
            version = "0.1.0"
            description = "Does something useful"

            async def setup(self):
                # Initialize resources
                self.is_active = True

            async def teardown(self):
                self.is_active = False

            async def get_status(self) -> dict:
                return {"healthy": True}
    """

    name: str = "unnamed"
    version: str = "0.0.0"
    description: str = ""
    is_active: bool = False

    @abstractmethod
    async def setup(self) -> None:
        """Initialize the extension. Called at app startup."""
        ...

    @abstractmethod
    async def teardown(self) -> None:
        """Cleanup the extension. Called at app shutdown."""
        ...

    @abstractmethod
    async def get_status(self) -> dict:
        """Return current status of the extension."""
        ...
