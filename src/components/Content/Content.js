// src/Views/Home/Solutionlist.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllSolutions } from "../../services/api";
import "./Content.css";

const Solutionlist = () => {
  const navigate = useNavigate();
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    const loadSolutions = async () => {
      try {
        const data = await fetchAllSolutions();
        setSolutions(data);
      } catch (error) {
        console.error("Error fetching solutions:", error);
      }
    };

    loadSolutions();
  }, []);

  function onClick(solution) {
    navigate(`/solution/${solution.id}`, { state: { port: solution.port } });
  }

  return (
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
  );
};

export default Solutionlist;
