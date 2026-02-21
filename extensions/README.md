# Extension Development Guide

Extensions are pluggable Python packages that add capabilities to Research Toolbox. Each extension lives in its own directory under `extensions/`.

## Structure

```
extensions/
├── my_extension/
│   ├── __init__.py         # Package marker
│   ├── extension.py        # Main class (must extend BaseExtension)
│   ├── config.py           # Extension-specific configuration
│   └── README.md           # Documentation
```

## Creating an Extension

1. Create a directory under `extensions/`:
   ```bash
   mkdir extensions/my_extension
   ```

2. Create `extension.py` with a class extending `BaseExtension`:
   ```python
   from backend.extensions.base import BaseExtension

   class MyExtension(BaseExtension):
       name = "my-extension"
       version = "0.1.0"
       description = "What this extension does"

       async def setup(self):
           self.is_active = True

       async def teardown(self):
           self.is_active = False

       async def get_status(self) -> dict:
           return {"healthy": self.is_active}
   ```

3. The backend auto-discovers your extension at startup.

## Built-in Extension Stubs

| Extension | Purpose |
|-----------|---------|
| `wandb_tracker` | Weights & Biases experiment tracking |
| `scheduler` | Experiment scheduling with priority queue |
| `alerts` | Alert conditions (loss spike, NaN detection, etc.) |
| `summarizer` | Background summarization and continual learning |

## API

Once registered, extensions are accessible via:
- `GET /api/extensions/` — List all extensions
- `GET /api/extensions/{name}/status` — Get extension status
