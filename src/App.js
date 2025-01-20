import "./App.css";
import Header from "./View/Header/Header";
import Content from "./View/Content/Content";
import Description from "./View/Description/Description";
import KubernetesContainers from "./View/KubernetesContainers/KubernetesContainers"; // Import the component
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
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/description/:id" element={<Description />} />
        <Route path="/KubernetesContainers" element={<KubernetesContainers />} /> 
      </Routes>
    </Router>
  );
};


export default App;
