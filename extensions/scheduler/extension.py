"""Scheduler Extension — Experiment scheduling with priority queue."""

import sys
sys.path.insert(0, str(__import__('pathlib').Path(__file__).parent.parent.parent / 'backend'))

from extensions.base import BaseExtension


class SchedulerExtension(BaseExtension):
    """Manages experiment scheduling with priority-based queuing.

    Features (planned):
    - Priority queue for experiment runs
    - Time estimation for queued experiments
    - GPU resource allocation tracking
    - Auto-scheduling based on resource availability
    - Integration with Kanban task status
    """

    name = "scheduler"
    version = "0.1.0"
    description = "Experiment scheduling with priority queue"

    async def setup(self) -> None:
        self.is_active = True
        self._queue: list = []

    async def teardown(self) -> None:
        self.is_active = False

    async def get_status(self) -> dict:
        return {
            "healthy": self.is_active,
            "queue_length": len(self._queue),
        }
