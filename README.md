# AI Resume Analyzer

Analyze your resume against any job description. Get keyword matches, gaps, and AI-powered strengths and weaknesses—all in one place.

---

## Features

- **Resume upload** — PDF, DOC, and DOCX
- **Job description input** — Paste the full job posting for tailored analysis
- **Keyword matching** — See which job-description keywords appear in your resume and which are missing
- **Strengths & weaknesses** — OpenAI-generated feedback to improve your resume
- **Similarity score** — Semantic similarity between your resume and the job description

## Tech Stack

| Layer    | Stack |
|----------|--------|
| Frontend | React, Axios, Tailwind CSS, Framer Motion, React Hot Toast |
| Backend  | FastAPI, Python 3.x |
| NLP      | SpaCy (`en_core_web_sm`), scikit-learn |
| AI       | OpenAI API |

## Prerequisites

- **Python 3.10+**
- **Node.js 18+** and npm
- **OpenAI API key** — [Create one](https://platform.openai.com/api-keys)

## Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### 2. Backend setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in the `backend` folder:

```env
OPENAI_API_KEY=sk-your-openai-api-key
```

Optional but recommended (better keyword/entity extraction):

```bash
python -m spacy download en_core_web_sm
```

Start the API:

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

API base URL: **http://127.0.0.1:8000**

### 3. Frontend setup

In a new terminal:

```bash
cd frontend
npm install
npm start
```

App URL: **http://localhost:3000** (or the next free port, e.g. 3001, 3002).

### 4. Use the app

1. Open the frontend URL in your browser.
2. Upload your resume (PDF, DOC, or DOCX).
3. Paste the job description.
4. Click **Analyze** and review matching keywords, missing keywords, strengths, weaknesses, and similarity score.

## Project structure

```
ai-resume-analyzer/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── routes.py      # API endpoints
│   │   ├── core/
│   │   │   └── config.py      # Settings, env
│   │   ├── models/
│   │   │   └── schemas.py     # Pydantic models
│   │   ├── services/
│   │   │   ├── resume_parser.py
│   │   │   └── analyzer.py
│   │   └── main.py
│   ├── .env                    # Not in git; add OPENAI_API_KEY
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
└── README.md
```

## Environment variables

| Variable        | Required | Description           |
|-----------------|----------|-----------------------|
| `OPENAI_API_KEY` | Yes      | Your OpenAI API key   |

Store these in `backend/.env`. Do not commit `.env`.

## API

### POST `/api/analyze`

Analyzes a resume against a job description.

| Field             | Type   | Description                    |
|-------------------|--------|--------------------------------|
| `resume`          | file   | PDF, DOC, or DOCX              |
| `job_description` | string | Job posting text (form field)  |

**Response:** `matching_keywords`, `missing_keywords`, `strengths`, `weaknesses`, `similarity_score`

## License

MIT
