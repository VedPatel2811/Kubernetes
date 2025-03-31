// API service for handling all backend calls
const BASE_URL = "http://127.0.0.1";

// Store unique tags with their associated IDs
let uniqueTags = new Map();

// Helper function to update unique tags
const updateUniqueTags = (tags, id) => {
  if (!tags) return;
  const tagArray = tags.split(",").map((tag) => tag.trim());
  tagArray.forEach((tag) => {
    if (!uniqueTags.has(tag)) {
      uniqueTags.set(tag, []);
    }
    if (!uniqueTags.get(tag).includes(id)) {
      uniqueTags.get(tag).push(id);
    }
  });
};

// Function to get all unique tags with their associated IDs
export const getUniqueTags = () => {
  return Array.from(uniqueTags.entries()).map(([tag, ids]) => ({
    tag,
    ids,
  }));
};

export const fetchAllSolutions = async () => {
  const allSolutions = [];
  // Clear existing tags before fetching new data
  uniqueTags.clear();

  // Fetch data from all ports (8080-8089)
  for (let port = 8080; port <= 8089; port++) {
    try {
      const response = await fetch(`${BASE_URL}:${port}/`);
      if (!response.ok) {
        continue;
      }
      const data = await response.json();
      allSolutions.push({ ...data, port });
    } catch (error) {
      continue;
    }
  }

  // Transform the API data to match our solution format
  const transformedData = allSolutions.map((item, index) => {
    const id = index + 1;
    // Update unique tags with the new solution's ID
    updateUniqueTags(item.tags, id);

    return {
      id,
      title: item.name,
      meta: `${item.serviceName} • ${item.ownerName}`,
      description: item.description,
      runtime: item.runtime,
      tags: item.tags,
      ownerEmail: item.ownerEmail,
      repoURL: item.repoURL,
      actsOn: item.actsOn,
      port: item.port,
    };
  });

  return transformedData;
};

export const fetchSolutionById = async (id, port) => {
  try {
    const response = await fetch(`${BASE_URL}:${port}/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch solution from port ${port}`);
    }
    const data = await response.json();

    // Update unique tags with the solution's ID without clearing existing tags
    updateUniqueTags(data.tags, parseInt(id));

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
    throw error;
  }
};

// Function to get solutions by tag
export const getSolutionsByTag = (tag) => {
  return uniqueTags.get(tag) || [];
};
