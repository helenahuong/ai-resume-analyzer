# app/core/config.py
# pyright: reportAttributeAccessIssue=none

import pydantic_settings
from typing import List
from pathlib import Path

class Settings(pydantic_settings.BaseSettings):
    OPENAI_API_KEY: str
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000"]

    class Config:
        env_file = str(Path(__file__).parent.parent.parent / ".env")
        env_file_encoding = 'utf-8'

settings = Settings()  # type: ignore
