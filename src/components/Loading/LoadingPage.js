import React from "react";
import "./LoadingPage.css";

const LoadingPage = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
        </div>
        <h1 className="loading-title">Loading...</h1>
        <p className="loading-text">
          Please wait while we prepare your request
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
