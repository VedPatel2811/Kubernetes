import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Menubar from "../../components/Menu/Menu";
import Solutionlist from "../../components/Content/Content";
import "./HomePage.css";

const HomePage = () => {
  const [selectedSolutionIds, setSelectedSolutionIds] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  const handleTagSelect = (solutionIds) => {
    setSelectedSolutionIds(solutionIds);
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="home-container">
      <Header onSearchResults={handleSearchResults} />
      <div className="home-content">
        <Menubar onTagSelect={handleTagSelect} />
        <Solutionlist
          selectedSolutionIds={selectedSolutionIds}
          searchResults={searchResults}
        />
      </div>
    </div>
  );
};

export default HomePage;
