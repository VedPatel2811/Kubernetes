// API service for handling all backend calls
const BASE_URL = "http://127.0.0.1";

export const fetchAllSolutions = async () => {
  const allSolutions = [];

  // Fetch data from all ports (8080-8089)
  for (let port = 8080; port <= 8089; port++) {
    try {
      const response = await fetch(`${BASE_URL}:${port}/`);
      if (!response.ok) {
        console.warn(`Failed to fetch from port ${port}`);
        continue;
      }
      const data = await response.json();
      allSolutions.push({ ...data, port });
    } catch (error) {
      console.warn(`Error fetching from port ${port}:`, error);
      continue;
    }
  }

  // Transform the API data to match our solution format
  return allSolutions.map((item, index) => ({
    id: index + 1,
    title: item.name,
    meta: `${item.serviceName} • ${item.ownerName}`,
    description: item.description,
    runtime: item.runtime,
    tags: item.tags,
    ownerEmail: item.ownerEmail,
    repoURL: item.repoURL,
    actsOn: item.actsOn,
    port: item.port,
  }));
};

export const fetchSolutionById = async (id, port) => {
  try {
    const response = await fetch(`${BASE_URL}:${port}/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch solution from port ${port}`);
    }
    const data = await response.json();
    return {
      id: parseInt(id),
      title: data.name,
      description: data.description,
      serviceName: data.serviceName,
      ownerName: data.ownerName,
      runtime: data.runtime,
      tags: data.tags,
      ownerEmail: data.ownerEmail,
      repoURL: data.repoURL,
      actsOn: data.actsOn,
      port: port,
    };
  } catch (error) {
    console.error("Error fetching solution:", error);
    throw error;
  }
};
