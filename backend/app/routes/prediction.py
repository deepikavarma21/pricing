from fastapi import APIRouter
from pydantic import BaseModel
from app.services.predictor import predict_price

router = APIRouter()

# Only user-facing fields
class RideInput(BaseModel):
    Number_of_Riders: int
    Location_Category: str
    Time_of_Booking: str
    Vehicle_Type: str
    Expected_Ride_Duration: int


@router.post("/predict")
def predict(data: RideInput):

    input_data = {
        "Number_of_Riders": data.Number_of_Riders,
        "Location_Category": data.Location_Category,
        "Time_of_Booking": data.Time_of_Booking,
        "Vehicle_Type": data.Vehicle_Type,
        "Expected_Ride_Duration": data.Expected_Ride_Duration
    }

    prediction = predict_price(input_data)

    return {
        "predicted_price": round(float(prediction), 2)
    }