import "./App.css";
import Header from "./View/Header/Header";
import Content from "./View/Content/Content";
import Description from "./View/Description/Description";
import Login from "./View/Authentication/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track login status

  // Function to handle login success
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Private Route Component
  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          {/* Public Route: Login */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* Private Routes: Content and Description */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Content />
              </PrivateRoute>
            }
          />
          <Route
            path="/description/:id"
            element={
              <PrivateRoute>
                <Description />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
