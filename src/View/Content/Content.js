// src/Views/Home/Solutionlist.js
import React, { useEffect, useState } from "react";
import { getSolutions } from "../../Controller/Content/ContentController";
import "./Content.css";
import { useNavigate } from "react-router-dom";
import Menubar from "../Menu/Menu";


const Solutionlist = () => {
  const [solutions, setSolutions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = getSolutions();
    setSolutions(data);
  }, []);

  function onClick(solution) {
    navigate(`/description/${solution.id}`);
  }

  return (
    <div className="main-layout">
      <Menubar />
      <div className="content">
        {solutions.map((solution) => (
          <div
            key={solution.id}
            onClick={() => onClick(solution)}
            className="solution-card"
          >
            <h3>{solution.title}</h3>
            <p>{solution.meta}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Solutionlist;
