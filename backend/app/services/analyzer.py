import openai
import spacy
from app.core.config import settings

openai.api_key = settings.OPENAI_API_KEY

# Load SpaCy model
nlp = spacy.load("en_core_web_sm")

class Analyzer:
    def __init__(self, resume_text: str, job_description: str):
        self.resume_text = resume_text
        self.job_description = job_description

    def analyze(self):
        # Extract keywords from job description
        job_keywords = self.extract_keywords(self.job_description)
        # Extract keywords from resume
        resume_keywords = self.extract_keywords(self.resume_text)

        # Identify matching and missing keywords
        matching_keywords = list(set(resume_keywords) & set(job_keywords))
        missing_keywords = list(set(job_keywords) - set(resume_keywords))

        # Generate strengths and weaknesses
        strengths = self.generate_strengths()
        weaknesses = self.generate_weaknesses()

        return {
            "matching_keywords": matching_keywords,
            "missing_keywords": missing_keywords,
            "strengths": strengths,
            "weaknesses": weaknesses,
        }

    def extract_keywords(self, text):
        doc = nlp(text)
        keywords = [token.lemma_.lower() for token in doc if not token.is_stop and not token.is_punct and token.is_alpha]
        return keywords

    def generate_strengths(self):
        prompt = f"Based on the following resume, identify the candidate's strengths:\n\n{self.resume_text}\n\nStrengths:"
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Ensure you're using the correct model version
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt},
            ]
        )
        strengths = response['choices'][0]['message']['content'].strip()
        return strengths

    def generate_weaknesses(self):
        prompt = f"Based on the following resume and job description, identify areas where the candidate can improve to better match the job requirements:\n\nResume:\n{self.resume_text}\n\nJob Description:\n{self.job_description}\n\nWeaknesses:"
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Ensure you're using the correct model version
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt},
            ]
        )
        weaknesses = response['choices'][0]['message']['content'].strip()
        return weaknesses
