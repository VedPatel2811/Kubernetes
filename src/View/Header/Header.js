import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";

const Header = () => {
  const [userEmail, setUserEmail] = useState(
    sessionStorage.getItem("user_email") || null
  );

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
      <h1>CSE Marketplace</h1>
      <div className="header-search">
        <button className="glyphicon glyphicon-search search-icon"></button>
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
