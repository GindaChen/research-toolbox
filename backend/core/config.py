"""Configuration via environment variables."""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment."""

    app_name: str = "research-toolbox"
    debug: bool = False
    host: str = "0.0.0.0"
    port: int = 8000

    # Extension directory (relative to repo root)
    extensions_dir: str = "../extensions"

    # Database (future)
    database_url: str = "sqlite:///./research_toolbox.db"

    model_config = {"env_prefix": "RT_"}


settings = Settings()
