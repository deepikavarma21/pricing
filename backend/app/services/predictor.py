import pandas as pd
import joblib
import random
from pathlib import Path

# ---------------- LOAD MODEL ----------------

BASE_DIR = Path(__file__).resolve().parent.parent.parent

model_path = BASE_DIR / "model.pkl"

model = joblib.load(model_path)


# ---------------- FEATURE ENGINEERING ----------------

def generate_past_rides():
    return random.randint(0, 100)


def generate_loyalty(past_rides):
    if past_rides <= 20:
        return "Regular"
    elif past_rides <= 60:
        return "Silver"
    return "Gold"


def generate_rating():
    return round(random.uniform(3.5, 5.0), 1)


def generate_drivers(location, time_booking):
    base_drivers = {
        "Urban": 80,
        "Suburban": 50,
        "Rural": 25,
    }

    drivers = base_drivers.get(location, 40)
    if time_booking == "Night":
        drivers = int(drivers * 0.6)
    elif time_booking == "Evening":
        drivers = int(drivers * 1.1)
    else:
        drivers = int(drivers * 0.95)

    # Add bounded variation to simulate real supply
    variation = random.randint(-5, 5)
    drivers = max(5, drivers + variation)
    return drivers


def engineer_features(user_input):
    past_rides = generate_past_rides()
    loyalty = generate_loyalty(past_rides)
    rating = generate_rating()
    drivers = generate_drivers(
        user_input["Location_Category"],
        user_input["Time_of_Booking"],
    )

    return {
        "Number_of_Riders": user_input["Number_of_Riders"],
        "Number_of_Drivers": drivers,
        "Location_Category": user_input["Location_Category"],
        "Customer_Loyalty_Status": loyalty,
        "Number_of_Past_Rides": past_rides,
        "Average_Ratings": rating,
        "Time_of_Booking": user_input["Time_of_Booking"],
        "Vehicle_Type": user_input["Vehicle_Type"],
        "Expected_Ride_Duration": user_input["Expected_Ride_Duration"],
    }


# ---------------- PREDICTION ----------------

def predict_price(user_input):
    features = engineer_features(user_input)
    data = pd.DataFrame([features])
    prediction = model.predict(data)
    return prediction[0]