# backend/app/models/schemas.py

from pydantic import BaseModel
from typing import List

class AnalysisResult(BaseModel):
    matching_keywords: List[str]
    missing_keywords: List[str]
    strengths: str
    weaknesses: str
