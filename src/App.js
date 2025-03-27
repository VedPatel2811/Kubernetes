import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  login,
  isAuthenticated,
  handleCallback,
} from "./View/Authentication/authService";
import Header from "./View/Header/Header";
import Content from "./View/Content/Content";
import Description from "./View/Description/Description";
import WelcomePage from "./View/Authentication/WelcomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcomePage, setShowWelcomePage] = useState(false);

  useEffect(() => {
    handleCallback();

    if (!isAuthenticated()) {
      login();
    } else {
      // If authenticated, check localStorage for the welcome page flag
      const isWelcomePageShown = localStorage.getItem("welcomePageShown");

      // If welcome page hasn't been shown, display it and set flag
      if (!isWelcomePageShown) {
        setShowWelcomePage(true);
        localStorage.setItem("welcomePageShown", "true");
      }

      setIsLoading(false);
    }
  }, []);

  return (
    <Router>
      <Header />
      <div className="main-content">
        {showWelcomePage ? (
          <WelcomePage onClose={() => setShowWelcomePage(false)} />
        ) : (
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/description/:id" element={<Description />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
