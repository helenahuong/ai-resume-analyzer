# backend/app/api/routes.py

from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.resume_parser import ResumeParser
from app.services.analyzer import Analyzer
from app.models.schemas import AnalysisResult

router = APIRouter()

@router.post("/analyze", response_model=AnalysisResult)
async def analyze_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    if not resume or not job_description:
        raise HTTPException(status_code=400, detail="Resume and job description are required.")

    # Parse the resume
    parser = ResumeParser(resume)
    resume_data = await parser.parse()

    # Analyze the resume against the job description
    analyzer = Analyzer(resume_data['text'], job_description)
    analysis_result = analyzer.analyze()

    return AnalysisResult(**analysis_result)
