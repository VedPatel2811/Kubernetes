import React, { useState, useEffect } from "react";

const Processors = () => {
  const [processors, setProcessors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the Flask API
    fetch("http://127.0.0.1:8001/apis/example.com/v1/namespaces/default/processors")
      .then((response) => response.json())
      .then((data) => {
        setProcessors(data.items || []); // Adjust based on the API response
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching processors:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading processors...</p>;
  }

  return (
    <div>
      <h1>Processors</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Service Name</th>
            <th>Owner Name</th>
            <th>Runtime</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {processors.map((processor, index) => (
            <tr key={index}>
              <td>{processor.metadata.name}</td>
              <td>{processor.spec.serviceName}</td>
              <td>{processor.spec.ownerName}</td>
              <td>{processor.spec.runtime}</td>
              <td>{processor.spec.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Processors;
