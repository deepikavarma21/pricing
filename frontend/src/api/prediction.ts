import axios from 'axios';

export interface RideInput {
  Number_of_Riders: number;
  Location_Category: string;
  Time_of_Booking: string;
  Vehicle_Type: string;
  Expected_Ride_Duration: number;
}

export interface PredictionResponse {
  predicted_price: number;
}

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function predictPrice(data: RideInput): Promise<PredictionResponse> {
  const response = await api.post<PredictionResponse>('/predict', data);
  return response.data;
}
