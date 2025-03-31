// src/Views/Home/Solutionlist.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Content.css";

const Solutionlist = () => {
  const navigate = useNavigate();
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const allSolutions = [];

        // Fetch data from all ports (8080-8089)
        for (let port = 8080; port <= 8089; port++) {
          try {
            const response = await fetch(`http://127.0.0.1:${port}/`);
            if (!response.ok) {
              console.warn(`Failed to fetch from port ${port}`);
              continue;
            }
            const data = await response.json();
            allSolutions.push({ ...data, port }); // Add port information to the data
          } catch (error) {
            console.warn(`Error fetching from port ${port}:`, error);
            continue;
          }
        }

        // Transform the API data to match our solution format
        const transformedData = allSolutions.map((item, index) => ({
          id: index + 1,
          title: item.name,
          meta: `${item.serviceName} • ${item.ownerName}`,
          description: item.description,
          runtime: item.runtime,
          tags: item.tags,
          ownerEmail: item.ownerEmail,
          repoURL: item.repoURL,
          actsOn: item.actsOn,
          port: item.port, // Include port in the transformed data
        }));

        setSolutions(transformedData);
      } catch (error) {
        console.error("Error fetching solutions:", error);
      }
    };

    fetchSolutions();
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
