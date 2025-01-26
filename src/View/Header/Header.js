import React from "react";
import "./Header.css";
import { login, logout, isAuthenticated } from "../Authentication/authService"; // Adjust the path if needed

const Header = () => {
  return (
    <header className="header">
      <h1>Marketplace</h1>
      <div className="header-search">
        <span className="search-icon">🔍</span>
        <input type="text" placeholder="Search" />
      </div>
      <div className="header-buttons">
        <button>Models</button>
        <button>Datasets</button>
        <button>Objects</button>
        {isAuthenticated() ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={login}>Login</button>
        )}
      </div>
    </header>
  );
};

export default Header;
