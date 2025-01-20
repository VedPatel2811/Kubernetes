import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Login.css";

const LoginPopup = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCancel = () => {
    setEmail("");
    setPassword("");
    setError("");
    setSuccess("");
    alert("Action canceled!");
    // Close popup or redirect, if needed
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to backend
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Login successful!");
        setError(""); // Clear any previous errors
        console.log("Login successful:", data);

        // Notify parent component of successful login
        onLogin();

        // Redirect to the home page
        navigate("/");
      } else {
        setError(data.error || "Login failed. Please try again.");
        setSuccess(""); // Clear any previous success message
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-popup-container">
      <form className="login-popup-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="login-button">
            Login
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
        {/* Display success or error messages */}
        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPopup;
