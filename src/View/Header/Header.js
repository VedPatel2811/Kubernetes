import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1>Marketplace</h1>
      <div className="header-search">
        <span className="search-icon">🔍</span>
        <input type="text" placeholder="Search" />
      </div>
      <div className="header-buttons">
        <button>Processes</button>
      </div>
    </header>
  );
};

export default Header;
