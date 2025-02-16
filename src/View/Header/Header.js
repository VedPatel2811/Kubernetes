import React, { useEffect, useState } from "react";
import "./Header.css";

const Header = () => {
  const [userEmail, setUserEmail] = useState(sessionStorage.getItem("user_email") || null);

  useEffect(() => {
    const interval = setInterval(() => {
      const email = sessionStorage.getItem("user_email");
      if (email && email !== userEmail) {
        setUserEmail(email);
        console.log("✅ Email updated in Header:", email);
      }
    }, 1000); // Check every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [userEmail]);

  return (
    <header className="header">
      <h1>Marketplace</h1>
      {userEmail && <p className="header-user">Logged in as: {userEmail}</p>}

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
