from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.prediction import router as prediction_router

app = FastAPI(
    title="Dynamic Pricing API",
    description="Premium ML Prediction API",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
# app.include_router(prediction_router)
app.include_router(prediction_router)

@app.get("/")
def home():
    return {
        "message": "Dynamic Pricing API Running"
    }