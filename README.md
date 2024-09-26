# AI Resume Analyzer

## Overview
The **AI Resume Analyzer** is a web application designed to assist job seekers in analyzing their resumes against specific job descriptions. By leveraging AI and natural language processing, this tool provides insights on matching keywords, strengths, and weaknesses, helping applicants improve their resumes for better job prospects.

## Features
- **Resume Upload**: Supports uploading resumes in PDF, DOC, and DOCX formats.
- **Job Description Input**: Allows users to enter job descriptions for tailored analysis.
- **Keyword Matching**: Identifies matching and missing keywords between the resume and job description.
- **Strengths and Weaknesses Analysis**: Provides a detailed report highlighting areas of strength and areas for improvement in the resume.

## Technologies Used
- **Frontend**:
  - [React.js](https://reactjs.org/)
  - [Axios](https://axios-http.com/)
  - [Tailwind CSS](https://tailwindcss.com/)
  
- **Backend**:
  - [FastAPI](https://fastapi.tiangolo.com/)
  - [OpenAI API](https://beta.openai.com/)
  - [SpaCy](https://spacy.io/)
  
- **Environment**:
  - Python 3.x
  - Node.js

## Installation

### Prerequisites
- Python 3.x
- Node.js and npm
- An OpenAI API key

### Backend Setup
1. **Clone the repository**:
   git clone <repository-url>
   cd backend
2. **Create a virtual environment**:
python -m venv .venv
source .venv/bin/activate  # On Windows use .venv\Scripts\activate

3. **Install dependencies**:
pip install -r requirements.txt

4. **Create a .env file: Create a .env file in the root directory and add your OpenAI API key:**
OPENAI_API_KEY=your-secret-openai-api-key

**5. Run the server:**
uvicorn app.main:app --reload

**The backend will be accessible at http://localhost:8000.**

### Frontend Setup
1. **Navigate to the frontend directory:**
cd frontend
2. **Install dependencies:**
npm install
**3. Run the application:**
npm start

**The frontend will be accessible at http://localhost:3000.**

### Usage
- Open the web application in your browser.
- Upload a resume file or enter resume text.
- Enter the job description for the position you are applying for.
- Click the "Analyze Resume" button to receive insights about the resume.
- Review the results, including matching keywords, missing keywords, strengths, and weaknesses.

### Acknowledgments

OpenAI for providing the AI capabilities.
SpaCy for powerful NLP tools.
