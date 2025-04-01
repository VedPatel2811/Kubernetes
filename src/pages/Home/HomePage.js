import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Menubar from "../../components/Menu/Menu";
import Solutionlist from "../../components/Content/Content";
import "./HomePage.css";

const HomePage = () => {
  const [selectedSolutionIds, setSelectedSolutionIds] = useState(null);

  const handleTagSelect = (solutionIds) => {
    setSelectedSolutionIds(solutionIds);
  };

  const handleSearch = (solutionIds) => {
    setSelectedSolutionIds(solutionIds);
  };

  return (
    <div className="home-container">
      <Header onSearch={handleSearch} />
      <div className="home-content">
        <Menubar onTagSelect={handleTagSelect} />
        <Solutionlist selectedSolutionIds={selectedSolutionIds} />
      </div>
    </div>
  );
};

export default HomePage;
