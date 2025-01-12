import "./App.css";
import Header from "./View/Header/Header";
import Content from "./View/Content/Content";
import Description from "./View/Description/Description";
import Login from "./View/Authentication/Login"; 
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Header />
      <div className="main-content">
        
        <div className="login-button-container">
          <Link to="/login" className="login-button">
            Login
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/description/:id" element={<Description />} />
          <Route path="/login" element={<Login />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
