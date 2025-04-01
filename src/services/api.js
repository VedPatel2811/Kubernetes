const BASE_URL = process.env.REACT_APP_BASE_URL;

// Store unique tags with their associated IDs
let uniqueTags = new Map();

// Store all solution details with their IDs for search functionality
let solutionDetails = new Map();

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

export const getUniqueTags = () => {
  return Array.from(uniqueTags.entries()).map(([tag, ids]) => ({
    tag,
    ids,
  }));
};

export const fetchAllSolutions = async () => {
  const allSolutions = [];
  uniqueTags.clear();
  solutionDetails.clear();

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

  const transformedData = allSolutions.map((item, index) => {
    const id = index + 1;
    updateUniqueTags(item.tags, id);

    // Store solution details in the Map
    solutionDetails.set(id, {
      name: item.name,
      serviceName: item.serviceName,
      ownerName: item.ownerName,
      tags: item.tags,
      port: item.port,
    });

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

  // Print all stored solution details
  console.log("Stored Solution Details:");
  solutionDetails.forEach((details, id) => {
    console.log(`ID: ${id}`);
    console.log(`Name: ${details.name}`);
    console.log(`Service Name: ${details.serviceName}`);
    console.log(`Owner Name: ${details.ownerName}`);
    console.log(`Tags: ${details.tags}`);
    console.log(`Port: ${details.port}`);
    console.log("-------------------");
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

    updateUniqueTags(data.tags, parseInt(id));

    // Update solution details in the Map
    solutionDetails.set(parseInt(id), {
      name: data.name,
      serviceName: data.serviceName,
      ownerName: data.ownerName,
      tags: data.tags,
      port: port,
    });

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

export const getSolutionsByTag = (tag) => {
  return uniqueTags.get(tag) || [];
};

// New function to get solution details by ID
export const getSolutionDetailsById = (id) => {
  return solutionDetails.get(parseInt(id)) || null;
};

// New function to search solutions by name, serviceName, ownerName, or tags
export const searchSolutions = (searchTerm) => {
  const results = [];
  searchTerm = searchTerm.toLowerCase();

  solutionDetails.forEach((details, id) => {
    if (
      details.name.toLowerCase().includes(searchTerm) ||
      details.serviceName.toLowerCase().includes(searchTerm) ||
      details.ownerName.toLowerCase().includes(searchTerm) ||
      details.tags.toLowerCase().includes(searchTerm)
    ) {
      results.push({
        id,
        ...details,
      });
    }
  });

  return results;
};
