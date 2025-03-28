import React from "react";
import Header from "../../components/Header/Header";
import Menubar from "../../components/Menu/Menu";
import Solutionlist from "../../components/Content/Content";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <Menubar />
        <Solutionlist />
      </div>
    </div>
  );
};

export default HomePage;
