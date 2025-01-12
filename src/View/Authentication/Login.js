import React, { useState } from "react";
import "./Login.css";

const LoginPopup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCancel = () => {
    setEmail("");
    setPassword("");
    console.log("Cancel button clicked");
    alert("Action canceled!");
    // Close popup or redirect, if needed
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login clicked with:", { email, password });
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
      </form>
    </div>
  );
};

export default LoginPopup;
