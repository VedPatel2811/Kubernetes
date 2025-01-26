import React, { useEffect } from "react";
import { login, logout, isAuthenticated ,handleCallback } from "./View/Authentication/authService"; // Import the token handling function
import Header from "./View/Header/Header"; // Path to your Header component
import Content from "./View/Content/Content"; // Existing content
import Description from "./View/Description/Description"; // Existing content
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  useEffect(() => {
    handleCallback(); // Process tokens if redirected from Auth0

    if (!isAuthenticated()) {
      login(); // Trigger login if not authenticated
    }
  }, []);

  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/description/:id" element={<Description />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
