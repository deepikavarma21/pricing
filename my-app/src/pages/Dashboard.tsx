import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import {
  Calculator,
  AlertCircle,
  Loader2,
  IndianRupee,
  MapPin,
  Users,
  Clock,
  Car,
} from "lucide-react";
import "./Dashboard.css";

interface RideInput {
  Number_of_Riders: number;
  Location_Category: string;
  Time_of_Booking: string;
  Vehicle_Type: string;
  Expected_Ride_Duration: number;
}

const Dashboard = () => {
  const [formData, setFormData] = useState<RideInput>({
    Number_of_Riders: 1,
    Location_Category: "Urban",
    Time_of_Booking: "Afternoon",
    Vehicle_Type: "Economy",
    Expected_Ride_Duration: 30,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<number | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["Number_of_Riders", "Expected_Ride_Duration"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData,
      );
      setPrediction(response.data.predicted_price);
    } catch (err: any) {
      setError(err.message || "An error occurred while connecting to the API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Price Predictor</h1>
          <p className="dashboard-subtitle">
            Enter ride details to calculate the optimal price.
          </p>
        </div>
      </div>

      <div className="dashboard-grid">
        <form className="prediction-form glass-panel" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>
                <Users size={14} /> Number of Riders
              </label>
              <input
                type="number"
                name="Number_of_Riders"
                value={formData.Number_of_Riders}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <div className="form-group">
              <label>
                <MapPin size={14} /> Location Category
              </label>
              <select
                name="Location_Category"
                value={formData.Location_Category}
                onChange={handleChange}
              >
                <option value="Urban">Urban</option>
                <option value="Suburban">Suburban</option>
                <option value="Rural">Rural</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                <Clock size={14} /> Time of Booking
              </label>
              <select
                name="Time_of_Booking"
                value={formData.Time_of_Booking}
                onChange={handleChange}
              >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                <Car size={14} /> Vehicle Type
              </label>
              <select
                name="Vehicle_Type"
                value={formData.Vehicle_Type}
                onChange={handleChange}
              >
                <option value="Economy">Economy</option>
                <option value="Premium">Premium</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>
              <Clock size={14} /> Expected Duration (mins)
            </label>
            <input
              type="number"
              name="Expected_Ride_Duration"
              value={formData.Expected_Ride_Duration}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary form-submit"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="spinner" size={20} />
            ) : (
              <Calculator size={20} />
            )}
            {loading ? "Calculating..." : "Predict Price"}
          </button>

          {error && (
            <div className="error-banner">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}
        </form>

        <div className="prediction-result-panel">
          {prediction !== null ? (
            <div className="result-card glass-panel animate-fade-in">
              <p className="result-label">Predicted Optimal Price</p>
              <h2 className="result-value">
                <IndianRupee size={36} />
                {prediction.toFixed(2)}
              </h2>
              <div className="result-details">
                <p>Based on your selected inputs:</p>
                <ul>
                  <li>
                    <strong>{formData.Vehicle_Type}</strong> ride in{" "}
                    <strong>{formData.Location_Category}</strong>
                  </li>
                  <li>
                    <strong>{formData.Expected_Ride_Duration}</strong> mins
                    expected duration
                  </li>
                  <li>
                    Current demand: <strong>{formData.Number_of_Riders}</strong>{" "}
                    riders
                  </li>
                  <li>
                    <em>
                      The backend simulates availability, loyalty, and driver
                      assignments behind the scenes.
                    </em>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="empty-state glass-panel">
              <Calculator size={48} className="empty-icon" />
              <h3>Awaiting Input</h3>
              <p>Fill out the parameters and click Predict Price.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
