"""Summarizer Extension — Background summarization and continual learning."""

import sys
sys.path.insert(0, str(__import__('pathlib').Path(__file__).parent.parent.parent / 'backend'))

from extensions.base import BaseExtension


class SummarizerExtension(BaseExtension):
    """Background agent that continuously summarizes research activity.

    Features (planned):
    - Auto-summarize experiment results as they complete
    - Summarize chat conversations into research journal entries
    - Extract key insights and patterns across experiments
    - Build a persistent knowledge base from research history
    - AFK-friendly: generate daily/weekly research digests
    """

    name = "summarizer"
    version = "0.1.0"
    description = "Background summarization and continual learning"

    async def setup(self) -> None:
        self.is_active = True

    async def teardown(self) -> None:
        self.is_active = False

    async def get_status(self) -> dict:
        return {
            "healthy": self.is_active,
            "summaries_generated": 0,
        }
