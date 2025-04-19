import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import WelcomePage from "./components/Welcome/WelcomePage";
import HomePage from "./pages/Home/HomePage";
import SolutionPage from "./pages/Solution/SolutionPage";
import LoadingPage from "./components/Loading/LoadingPage";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  const { loginWithRedirect, isAuthenticated, user, isLoading } = useAuth0();
  const [showWelcome, setShowWelcome] = useState(
    localStorage.getItem("welcomeShown") !== "true"
  );

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      sessionStorage.setItem("user_email", user.email);
    }
  }, [isAuthenticated, user]);

  const handleWelcomeClose = () => {
    setShowWelcome(false);
    localStorage.setItem("welcomeShown", "true");
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Router>
      <div className="App">
        {showWelcome ? (
          <WelcomePage onClose={handleWelcomeClose} />
        ) : (
          <>
            <main className="main-content">
              <Routes>
                {/* Home page route */}
                <Route path="/" element={<HomePage />} />

                {/* Solution page route */}
                <Route path="/solution/:id" element={<SolutionPage />} />
              </Routes>
            </main>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
