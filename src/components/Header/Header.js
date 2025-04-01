import React, { useEffect, useState } from "react";
import "./Header.css";
import searchIcon from "../../assets/search-icon.png";
import { fetchAllSolutions } from "../../services/api";

const Header = ({ onSearch }) => {
  const [userEmail, setUserEmail] = useState(
    sessionStorage.getItem("user_email") || null
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const email = sessionStorage.getItem("user_email");
      if (email && email !== userEmail) {
        setUserEmail(email);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [userEmail]);

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query.length >= 3) {
      try {
        const solutions = await fetchAllSolutions();
        const results = solutions.filter((solution) => {
          // Extract owner name and service name from meta field
          const [serviceName, ownerName] = solution.meta.split(" • ");

          const searchFields = [
            solution.title.toLowerCase(),
            serviceName?.toLowerCase(),
            ownerName?.toLowerCase(),
            solution.tags?.toLowerCase(),
          ];

          return searchFields.some(
            (field) => field && field.includes(query.toLowerCase())
          );
        });

        const matchingIds = results.map((solution) => solution.id);
        console.log("Matching solution IDs:", matchingIds);
        onSearch(matchingIds);
      } catch (error) {
        console.error("Error searching solutions:", error);
        onSearch([]);
      }
    } else {
      onSearch(null);
    }
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
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
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
