import React, { useEffect, useState } from "react";
import "./Header.css";
import searchIcon from "../../assets/search-icon.png";
import { searchSolutions } from "../../services/api";

const Header = ({ onSearchResults }) => {
  const [userEmail, setUserEmail] = useState(
    sessionStorage.getItem("user_email") || null
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const email = sessionStorage.getItem("user_email");
      if (email && email !== userEmail) {
        setUserEmail(email);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [userEmail]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      onSearchResults(null); // Clear results if search is empty
      return;
    }

    const results = searchSolutions(value);
    console.log("Search Results:", results);
    onSearchResults(results);
  };

  return (
    <header className="header">
      <h1>CSE Marketplace</h1>
      <div className="header-search">
        <button className="search-icon-button">
          <img src={searchIcon} alt="search" className="search-icon" />
        </button>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="header-buttons">
        <button>Processes</button>
        <div className="user-info">
          {userEmail ? userEmail.substring(0, userEmail.indexOf("@")) : "Guest"}
        </div>
      </div>
    </header>
  );
};

export default Header;
