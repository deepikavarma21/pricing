import { useState, type ChangeEvent } from "react";
import { predictPrice } from "../api/prediction";
import {
  Users,
  MapPin,
  DollarSign,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    Number_of_Riders: "",
    Location_Category: "Urban",
    Time_of_Booking: "Morning",
    Vehicle_Type: "Economy",
    Expected_Ride_Duration: "",
  });
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setError(null);
    setPrediction(null);

    if (!formData.Number_of_Riders || !formData.Expected_Ride_Duration) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const data = await predictPrice({
        Number_of_Riders: Number(formData.Number_of_Riders),
        Location_Category: formData.Location_Category,
        Time_of_Booking: formData.Time_of_Booking,
        Vehicle_Type: formData.Vehicle_Type,
        Expected_Ride_Duration: Number(formData.Expected_Ride_Duration),
      });
      setPrediction(data.predicted_price);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail || "Unable to generate a prediction.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Predict with confidence</p>
          <h1>
            Ride pricing that blends user inputs with intelligent supply
            modeling.
          </h1>
          <p className="dashboard-lead">
            Submit only the key booking details and let the backend simulate
            availability, loyalty, and ratings before returning the estimated
            fare.
          </p>
        </div>
        <div className="dashboard-metrics">
          <div className="metric-card">
            <Users size={20} />
            <span>Demand-driven pricing</span>
          </div>
          <div className="metric-card">
            <MapPin size={20} />
            <span>Location-aware fare engine</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="panel form-panel">
          <div className="panel-title">Enter booking details</div>
          <div className="form-row">
            <label className="field-label">Number of Riders</label>
            <input
              name="Number_of_Riders"
              type="number"
              value={formData.Number_of_Riders}
              onChange={handleChange}
              className="field-input"
              placeholder="1"
              min={1}
            />
          </div>

          <div className="form-row">
            <label className="field-label">Location Category</label>
            <select
              name="Location_Category"
              value={formData.Location_Category}
              onChange={handleChange}
              className="field-input"
            >
              <option value="Urban">Urban</option>
              <option value="Suburban">Suburban</option>
              <option value="Rural">Rural</option>
            </select>
          </div>

          <div className="form-row split-row">
            <div>
              <label className="field-label">Time of Booking</label>
              <select
                name="Time_of_Booking"
                value={formData.Time_of_Booking}
                onChange={handleChange}
                className="field-input"
              >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
              </select>
            </div>
            <div>
              <label className="field-label">Vehicle Type</label>
              <select
                name="Vehicle_Type"
                value={formData.Vehicle_Type}
                onChange={handleChange}
                className="field-input"
              >
                <option value="Economy">Economy</option>
                <option value="Premium">Premium</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <label className="field-label">Expected Ride Duration (mins)</label>
            <input
              name="Expected_Ride_Duration"
              type="number"
              value={formData.Expected_Ride_Duration}
              onChange={handleChange}
              className="field-input"
              placeholder="30"
              min={1}
            />
          </div>

          {error && (
            <div className="status-banner error-banner">
              <AlertTriangle size={18} />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="submit-button"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="button-icon" /> Working...
              </>
            ) : (
              <>
                <DollarSign size={18} className="button-icon" /> Predict Price
              </>
            )}
          </button>
        </section>

        <aside className="panel result-panel">
          <div className="panel-title">Prediction result</div>
          {prediction !== null ? (
            <div className="result-card">
              <div className="result-label">Estimated fare</div>
              <div className="result-value">₹ {prediction.toFixed(2)}</div>
              <div className="result-note">
                The backend smartly infers driver availability and loyalty
                signals for a production-style pricing estimate.
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <p>Submit your booking input to see the estimated ride price.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
