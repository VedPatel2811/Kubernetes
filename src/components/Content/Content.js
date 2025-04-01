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
      // Show all solutions when no search is active
      setFilteredSolutions(solutions);
    } else if (selectedSolutionIds.length === 0) {
      // Show no solutions when search returns no results
      setFilteredSolutions([]);
    } else {
      // Filter solutions based on search results
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
      {filteredSolutions.length === 0 ? (
        <div className="no-results">
          {selectedSolutionIds === null
            ? "Loading solutions..."
            : "No solutions found matching your search."}
        </div>
      ) : (
        filteredSolutions.map((solution) => (
          <div
            key={solution.id}
            onClick={() => onClick(solution)}
            className="solution-card"
          >
            <h3>{solution.title}</h3>
            <p>{solution.meta}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Solutionlist;
