import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, TrendingUp, Zap } from 'lucide-react';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-container animate-fade-in">
      <div className="hero-section">
        <div className="hero-badge glass-panel">
          <Zap size={16} className="badge-icon" />
          <span>v1.0.0 is now live</span>
        </div>
        <h1 className="hero-title">
          Intelligent <span className="text-gradient">Dynamic Pricing</span>
        </h1>
        <p className="hero-subtitle">
          Leverage our premium ML model to predict optimal retail ride costs based on real-time factors like location, time, vehicle type, and driver availability.
        </p>
        <div className="hero-actions">
          <Link to="/dashboard" className="btn-primary">
            Launch Dashboard
            <ArrowRight size={20} />
          </Link>
          <a href="http://127.0.0.1:8000/docs#/" target="_blank" rel="noreferrer" className="btn-secondary glass-panel">
            View API Docs
          </a>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card glass-panel">
          <div className="feature-icon-wrapper blue">
            <BarChart3 size={24} />
          </div>
          <h3>Data-Driven Insights</h3>
          <p>Analyzes historical cost patterns against current demand.</p>
        </div>
        <div className="feature-card glass-panel">
          <div className="feature-icon-wrapper purple">
            <TrendingUp size={24} />
          </div>
          <h3>Accurate Predictions</h3>
          <p>Linear Regression model delivering high R² score confidence.</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
