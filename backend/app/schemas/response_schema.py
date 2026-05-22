from pydantic import BaseModel
from typing import List, Dict, Any

class PredictionResponse(BaseModel):
    predictions: List[Dict[str, Any]]