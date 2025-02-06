import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to Marketplace after 3 seconds
    const timer = setTimeout(() => {
      navigate("/Header");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome-container">
      <h1>Welcome to the Marketplace</h1>
      <p>Loading solutions...</p>
    </div>
  );
};

export default WelcomePage;
