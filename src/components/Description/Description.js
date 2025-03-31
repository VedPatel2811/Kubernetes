import React, { useState, useEffect } from "react";
import "./Description.css";
import { useParams, useLocation } from "react-router-dom";
import { fetchSolutionById } from "../../services/api";

const Description = () => {
  const { id } = useParams();
  const location = useLocation();
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSolution = async () => {
      try {
        const port = location.state?.port || 8080;
        const data = await fetchSolutionById(id, port);
        setSolution(data);
      } catch (error) {
        console.error("Error fetching solution:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSolution();
  }, [id, location.state?.port]);

  if (loading) {
    return <div className="description">Loading...</div>;
  }

  if (!solution) {
    return <div className="description">Solution not found</div>;
  }

  return (
    <div className="description">
      <header className="description-header">
        <h1>{solution.title}</h1>
        <button className="description-download">Download</button>
      </header>

      <div className="description-content">
        <section className="description-link">
          <h3>Link</h3>
          <a href={solution.repoURL} target="_blank" rel="noopener noreferrer">
            {solution.repoURL}
          </a>
        </section>

        <section className="description-details">
          <h3>Description</h3>
          <p>{solution.description}</p>
          <div className="solution-meta">
            <p>
              <strong>Service Name:</strong> {solution.serviceName}
            </p>
            <p>
              <strong>Owner:</strong> {solution.ownerName}
            </p>
            <p>
              <strong>Runtime:</strong> {solution.runtime}
            </p>
            <p>
              <strong>Acts On:</strong> {solution.actsOn}
            </p>
          </div>
        </section>

        <section className="description-how-to-use">
          <h3>How to Use</h3>
          <p>Follow the steps below to set up the service:</p>
          <pre>
            <code>{`# Example usage of ${solution.title}`}</code>
          </pre>
          <pre>
            <code>
              {`# API endpoint: http://127.0.0.1:${solution.port}/${solution.serviceName}\n# Content-Type: ${solution.actsOn}`}
            </code>
          </pre>
        </section>
      </div>
    </div>
  );
};

export default Description;
