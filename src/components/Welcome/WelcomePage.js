import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

const WelcomePage = ({ onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, onClose]);

  return (
    <div className="welcome-container">
      <h1>Welcome to the Marketplace</h1>
      <p>Loading solutions...</p>
    </div>
  );
};

export default WelcomePage;
