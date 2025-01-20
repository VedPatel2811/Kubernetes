import React, { useState, useEffect } from "react";

const KubernetesContainers = () => {
  const [containers, setContainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch container data from the Python API
    fetch("http://localhost:5000/containers")
      .then((response) => response.json())
      .then((data) => {
        setContainers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching container data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading containers...</p>;
  }

  return (
    <div>
      <h1>Kubernetes Containers</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Service Name</th>
            <th>Owner Name</th>
            <th>Owner Email</th>
            <th>Runtime</th>
            <th>Tags</th>
            <th>Description</th>
            <th>Acts On</th>
            <th>Repo URL</th>
            <th>Namespace</th>
            <th>Image</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {containers.map((container, index) => (
            <tr key={index}>
              <td>{container.name}</td>
              <td>{container.serviceName}</td>
              <td>{container.ownerName}</td>
              <td>{container.ownerEmail}</td>
              <td>{container.runtime}</td>
              <td>{container.tags.length > 0 ? container.tags.join(", ") : "N/A"}</td>
              <td>{container.description}</td>
              <td>{container.actsOn}</td>
              <td>
                {container.repoURL ? (
                  <a href={container.repoURL} target="_blank" rel="noopener noreferrer">
                    Repo Link
                  </a>
                ) : (
                  "N/A"
                )}
              </td>
              <td>{container.namespace}</td>
              <td>{container.image}</td>
              <td>{container.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KubernetesContainers;
