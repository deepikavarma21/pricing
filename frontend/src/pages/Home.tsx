import { Link } from "react-router-dom";
import { Sparkles, ShieldCheck, Activity } from "lucide-react";
import "../styles/global.css";

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">Smart pricing, instantly</span>
          <h1>Premium ride pricing powered by intelligent forecasting.</h1>
          <p>
            Enter the key ride details and let the backend simulate driver
            availability, loyalty, and demand before predicting the optimal
            fare.
          </p>
          <Link to="/dashboard" className="hero-button">
            Launch Dashboard
          </Link>
        </div>

        <div className="hero-visual">
          <div className="hero-card">
            <div className="hero-card-title">What this app does</div>
            <ul className="hero-features">
              <li>
                <Sparkles size={18} /> Real-time pricing recommendations
              </li>
              <li>
                <ShieldCheck size={18} /> Simulated loyalty and driver
                availability
              </li>
              <li>
                <Activity size={18} /> Fast, clean request-only frontend
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
