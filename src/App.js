import "./styles.css";
import Header from "./View/Header/Header";
import Content from "./View/Content/Content";
import Description from "./View/Description/Description";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="marketplace-container">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/description/:id" element={<Description />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
