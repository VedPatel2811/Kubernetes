import React from "react";
import Header from "../../components/Header/Header";
import Description from "../../components/Description/Description";
import "./SolutionPage.css";

const SolutionPage = () => {
  return (
    <div className="solution-page">
      <Header hideSearch={true} />
      <Description />
    </div>
  );
};

export default SolutionPage;
