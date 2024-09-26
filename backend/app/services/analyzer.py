import openai
import spacy
import torch
from sklearn.metrics.pairwise import cosine_similarity
from app.core.config import settings

# Load SpaCy model
nlp = spacy.load("en_core_web_sm")

openai.api_key = settings.OPENAI_API_KEY

class Analyzer:
    def __init__(self, resume_text: str, job_description: str):
        self.resume_text = resume_text
        self.job_description = job_description

    def analyze(self):
        # Extract keywords and entities from both resume and job description
        resume_data = self.extract_data(self.resume_text)
        job_data = self.extract_data(self.job_description)

        # Calculate semantic similarity score
        similarity_score = self.calculate_semantic_similarity(resume_data['text'], job_data['text'])

        return {
            "matching_keywords": list(set(resume_data['keywords']) & set(job_data['keywords'])),
            "missing_keywords": list(set(job_data['keywords']) - set(resume_data['keywords'])),
            "strengths": self.generate_strengths(),
            "weaknesses": self.generate_weaknesses(),
            "similarity_score": similarity_score
        }

    def extract_data(self, text):
        # This method extracts keywords and other entities from the text
        doc = nlp(text)
        keywords = [token.lemma_.lower() for token in doc if not token.is_stop and not token.is_punct and token.is_alpha]
        return {
            "text": text,
            "keywords": keywords,
            "entities": [(ent.text, ent.label_) for ent in doc.ents]
        }

    def calculate_semantic_similarity(self, resume_text, job_description):
        # Convert texts to embeddings using OpenAI's API
        try:
            resume_embedding = self.get_embedding(resume_text)
            job_embedding = self.get_embedding(job_description)

            # Calculate cosine similarity
            if resume_embedding is not None and job_embedding is not None:
                score = cosine_similarity([resume_embedding], [job_embedding])[0][0]
                return score
            else:
                return None
        except Exception as e:
            print(f"Error in calculating similarity: {e}")
            return None

    def get_embedding(self, text):
        response = openai.Embedding.create(
            model="text-embedding-ada-002",
            input=text
        )
        return response['data'][0]['embedding']

    def generate_strengths(self):
        prompt = f"Based on the following resume, identify the candidate's strengths:\n\n{self.resume_text}\n\nStrengths:"
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a senior hiring executive."},
                {"role": "user", "content": prompt},
            ]
        )
        strengths = response['choices'][0]['message']['content'].strip()
        return strengths

    def generate_weaknesses(self):
        prompt = f"Based on the following resume and job description, identify areas where the candidate can improve to better match the job requirements:\n\nResume:\n{self.resume_text}\n\nJob Description:\n{self.job_description}\n\nWeaknesses:"
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a senior hiring executive."},
                {"role": "user", "content": prompt},
            ]
        )
        weaknesses = response['choices'][0]['message']['content'].strip()
        return weaknesses
