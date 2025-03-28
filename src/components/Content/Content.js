// src/Views/Home/Solutionlist.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Content.css";

export const solutions = [
  { id: 1, title: "Solution-1", meta: "GitHub • MM/DD/YYYY" },
  { id: 2, title: "Solution-2", meta: "GitHub • MM/DD/YYYY" },
  { id: 3, title: "Solution-3", meta: "GitHub • MM/DD/YYYY" },
  { id: 4, title: "Solution-4", meta: "GitHub • MM/DD/YYYY" },
  { id: 5, title: "Solution-5", meta: "GitHub • MM/DD/YYYY" },
  { id: 6, title: "Solution-6", meta: "GitHub • MM/DD/YYYY" },
  { id: 7, title: "Solution-7", meta: "GitHub • MM/DD/YYYY" },
  { id: 8, title: "Solution-8", meta: "GitHub • MM/DD/YYYY" },
  { id: 9, title: "Solution-9", meta: "GitHub • MM/DD/YYYY" },
  { id: 10, title: "Solution-10", meta: "GitHub • MM/DD/YYYY" },
];

const Solutionlist = () => {
  const navigate = useNavigate();

  function onClick(solution) {
    navigate(`/solution/${solution.id}`);
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
