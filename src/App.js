import React, { useEffect , useState } from "react";
import { login, isAuthenticated ,handleCallback } from "./View/Authentication/authService";
import Header from "./View/Header/Header"; 
import Content from "./View/Content/Content"; 
import Description from "./View/Description/Description"; 
import WelcomePage from "./View/Authentication/WelcomePage"; // Welocme page 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    handleCallback();

    if (!isAuthenticated()) {
      login();
    } else {
      setIsLoading(false); 
    }
  }, []);

  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          {isLoading ? (
            <Route path="/" element={<WelcomePage />} />
          ) : (
            <>
              <Route path="/" element={<Content />} />
              <Route path="/description/:id" element={<Description />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;