import React from "react";
import "./Header.css";
import { useAuth0 } from "@auth0/auth0-react"; // Import Auth0 hook

const Header = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0(); // Destructure Auth0 functions

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
        {isAuthenticated ? (
          <button
            onClick={() =>
              logout({
                logoutParams: { returnTo: window.location.origin },
              })
            }
          >
            Logout
          </button>
        ) : (
          <button onClick={() => loginWithRedirect()}>Login</button>
        )}
      </div>
    </header>
  );
};

export default Header;
