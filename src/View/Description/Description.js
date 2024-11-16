import React from "react";
import "./Description.css";
import { useParams } from "react-router-dom";
import { solutions } from "../../Model/Content/ContentModel";
const Description = () => {
  const { id } = useParams();
  const solution = solutions.find((s) => s.id === parseInt(id));
  return (
    <div className="description">
      <header className="description-heading">
        <h1>{solution.title}</h1>
        <button className="description-download">Download</button>
      </header>
    </div>
  );
};

export default Description;
