---
name: create-extension
description: Scaffold a new extension package for Research Toolbox
---

# Create Extension Skill

## Purpose
Scaffold a new extension with the correct structure, base class, and documentation.

## When to Use
- When adding a new integration (e.g., W&B, Slack, cloud providers)
- When automating a recurring research pattern
- When a user requests a new capability

## Instructions

1. **Determine the extension name** — use `snake_case` (e.g., `gpu_monitor`, `slack_notifier`)

2. **Create the directory structure**:
```bash
mkdir -p extensions/<name>
```

3. **Create `extensions/<name>/__init__.py`**:
```python
"""<Name> Extension."""
```

4. **Create `extensions/<name>/extension.py`**:
```python
import sys
sys.path.insert(0, str(__import__('pathlib').Path(__file__).parent.parent.parent / 'backend'))

from extensions.base import BaseExtension


class <ClassName>Extension(BaseExtension):
    """<Description>.

    Features (planned):
    - Feature 1
    - Feature 2
    """

    name = "<kebab-case-name>"
    version = "0.1.0"
    description = "<One-line description>"

    async def setup(self) -> None:
        self.is_active = True

    async def teardown(self) -> None:
        self.is_active = False

    async def get_status(self) -> dict:
        return {"healthy": self.is_active}
```

5. **Create `extensions/<name>/README.md`** with usage instructions

6. **Verify** the extension is auto-discovered by the backend:
```bash
cd backend && python -c "from extensions import discover_extensions; print(discover_extensions())"
```

7. **Create a GitHub issue** for tracking the extension's development with label `type:extension`
