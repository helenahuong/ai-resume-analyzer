# backend/app/models/schemas.py
# pyright: reportAttributeAccessIssue=none

import pydantic
from typing import List, Optional

class AnalysisResult(pydantic.BaseModel):
    matching_keywords: List[str]
    missing_keywords: List[str]
    strengths: str
    weaknesses: str
    similarity_score: Optional[float] = None 
