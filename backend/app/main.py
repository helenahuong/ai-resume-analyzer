# pyright: reportAttributeAccessIssue=none
import fastapi
from starlette.middleware.cors import CORSMiddleware
from app.api.routes import router as api_router  # Import the api_router

app = fastapi.FastAPI()  # type: ignore[attr-defined]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "http://127.0.0.1:3002",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the AI Resume Analyzer API"}

# Include your other routers
app.include_router(api_router, prefix="/api")
