import io
import re
from typing import Any
import spacy
import PyPDF2
from docx import Document
import fastapi

# pyright: reportAttributeAccessIssue=none

_nlp = None
_nlp_unavailable = False

def _get_nlp():
    global _nlp, _nlp_unavailable
    if _nlp_unavailable:
        return None
    if _nlp is None:
        try:
            _nlp = spacy.load("en_core_web_sm")
        except OSError:
            _nlp_unavailable = True
            return None
    return _nlp

class ResumeParser:
    def __init__(self, file: fastapi.UploadFile):
        self.file = file

    async def parse(self) -> dict[str, Any]:
        content = await self.file.read()
        text = self.extract_text(self.file.filename, content)
        data = self.extract_data(text)
        return data

    def extract_text(self, filename, content):
        if filename.lower().endswith('.pdf'):
            return self.extract_text_from_pdf(content)
        elif filename.lower().endswith(('.doc', '.docx')):
            return self.extract_text_from_docx(content)
        else:
            return content.decode('utf-8', errors='ignore')

    def extract_text_from_pdf(self, content):
        reader = PyPDF2.PdfReader(io.BytesIO(content))
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        return text

    def extract_text_from_docx(self, content):
        document = Document(io.BytesIO(content))
        return "\n".join([para.text for para in document.paragraphs])

    def extract_data(self, text):
        nlp = _get_nlp()
        if nlp is not None:
            doc = nlp(text)
            keywords = [token.lemma_.lower() for token in doc if not token.is_stop and not token.is_punct and token.is_alpha]
            name = self.extract_name(doc)
        else:
            # Fallback when en_core_web_sm is not installed: run `python -m spacy download en_core_web_sm`
            doc = None
            keywords = self._extract_keywords_fallback(text)
            name = self._extract_name_fallback(text)
        email = self.extract_email(text)
        phone = self.extract_phone_number(text)
        return {
            "name": name,
            "email": email,
            "phone": phone,
            "keywords": keywords,
            "text": text,
        }

    def extract_email(self, text):
        match = re.search(r'[\w\.-]+@[\w\.-]+', text)
        return match.group(0) if match else None

    def extract_phone_number(self, text):
        match = re.search(r'\+?\d[\d -]{8,}\d', text)
        return match.group(0) if match else None

    def extract_name(self, doc):
        if doc is None:
            return None
        for ent in doc.ents:
            if ent.label_ == 'PERSON':
                return ent.text
        return None

    def _extract_keywords_fallback(self, text):
        """Simple keyword extraction without spaCy (used when en_core_web_sm is not installed)."""
        stop = {"the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "by", "from", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "do", "does", "did", "will", "would", "could", "should", "may", "might", "must", "can", "this", "that", "these", "those", "i", "you", "he", "she", "it", "we", "they", "my", "your", "his", "her", "its", "our", "their"}
        words = re.findall(r"\b[a-zA-Z]{2,}\b", text.lower())
        return list(dict.fromkeys(w for w in words if w not in stop))[:200]

    def _extract_name_fallback(self, text):
        """Use first non-empty line as a rough name guess when spaCy NER is unavailable."""
        for line in text.splitlines():
            line = line.strip()
            if len(line) > 1 and len(line) < 80 and not line.startswith("http") and "@" not in line:
                return line
        return None
