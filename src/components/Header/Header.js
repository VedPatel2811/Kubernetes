import React, { useEffect, useState } from "react";
import "./Header.css";
import searchIcon from "../../assets/search-icon.png";

const Header = () => {
  const [userEmail, setUserEmail] = useState(
    sessionStorage.getItem("user_email") || null
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const email = sessionStorage.getItem("user_email");
      if (email && email !== userEmail) {
        setUserEmail(email);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [userEmail]);

  return (
    <header className="header">
      <h1>CSE Marketplace</h1>
      <div className="header-search">
        <button className="search-icon-button">
          <img src={searchIcon} alt="search" className="search-icon" />
        </button>
        <input type="text" placeholder="Search" />
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
