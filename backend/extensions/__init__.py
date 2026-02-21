"""Extension discovery and registration."""

from __future__ import annotations

import importlib
import os
from pathlib import Path
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from extensions.base import BaseExtension


def discover_extensions(extensions_dir: str | None = None) -> dict[str, BaseExtension]:
    """Discover and instantiate extensions from the extensions directory.

    Each extension must have an `extension.py` with a class extending BaseExtension.
    """
    if extensions_dir is None:
        extensions_dir = os.environ.get(
            "RT_EXTENSIONS_DIR",
            str(Path(__file__).parent.parent.parent / "extensions"),
        )

    extensions: dict[str, BaseExtension] = {}
    ext_path = Path(extensions_dir)

    if not ext_path.exists():
        return extensions

    for child in ext_path.iterdir():
        if not child.is_dir() or child.name.startswith(("_", ".")):
            continue

        ext_module_path = child / "extension.py"
        if not ext_module_path.exists():
            continue

        try:
            spec = importlib.util.spec_from_file_location(
                f"ext_{child.name}", str(ext_module_path)
            )
            if spec and spec.loader:
                module = importlib.util.module_from_spec(spec)
                spec.loader.exec_module(module)

                # Look for a class that extends BaseExtension
                for attr_name in dir(module):
                    attr = getattr(module, attr_name)
                    if (
                        isinstance(attr, type)
                        and attr_name != "BaseExtension"
                        and hasattr(attr, "name")
                        and hasattr(attr, "setup")
                    ):
                        instance = attr()
                        extensions[instance.name] = instance
                        break
        except Exception as e:
            print(f"Warning: Failed to load extension '{child.name}': {e}")

    return extensions
