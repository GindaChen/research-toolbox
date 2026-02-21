"""Alerts Extension — Customizable alert conditions for experiment monitoring."""

import sys
sys.path.insert(0, str(__import__('pathlib').Path(__file__).parent.parent.parent / 'backend'))

from extensions.base import BaseExtension


class AlertsExtension(BaseExtension):
    """Monitors experiments and triggers alerts on configurable conditions.

    Features (planned):
    - Loss spike detection
    - NaN/Inf detection in metrics
    - Training stall detection
    - Custom threshold-based alerts
    - Contextual info display (what happened, why, suggested action)
    - Notification channels (in-app, Slack, email)
    """

    name = "alerts"
    version = "0.1.0"
    description = "Customizable alert conditions for experiment monitoring"

    async def setup(self) -> None:
        self.is_active = True
        self._rules: list = []

    async def teardown(self) -> None:
        self.is_active = False

    async def get_status(self) -> dict:
        return {
            "healthy": self.is_active,
            "active_rules": len(self._rules),
        }
