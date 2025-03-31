// src/Views/Home/Solutionlist.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllSolutions } from "../../services/api";
import "./Content.css";

const Solutionlist = ({ selectedSolutionIds }) => {
  const navigate = useNavigate();
  const [solutions, setSolutions] = useState([]);
  const [filteredSolutions, setFilteredSolutions] = useState([]);

  useEffect(() => {
    const loadSolutions = async () => {
      try {
        const data = await fetchAllSolutions();
        setSolutions(data);
        setFilteredSolutions(data);
      } catch (error) {
        console.error("Error fetching solutions:", error);
      }
    };

    loadSolutions();
  }, []);

  useEffect(() => {
    if (selectedSolutionIds === null) {
      // If no tag is selected, show all solutions
      setFilteredSolutions(solutions);
    } else {
      // Filter solutions based on selected tag
      const filtered = solutions.filter((solution) =>
        selectedSolutionIds.includes(solution.id)
      );
      setFilteredSolutions(filtered);
    }
  }, [selectedSolutionIds, solutions]);

  function onClick(solution) {
    navigate(`/solution/${solution.id}`, { state: { port: solution.port } });
  }

  return (
    <div className="content">
      {filteredSolutions.map((solution) => (
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
