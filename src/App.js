import "./App.css";
import Header from "./View/Header/Header";
import Content from "./View/Content/Content";
import Description from "./View/Description/Description";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
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
