const BASE_URL = process.env.REACT_APP_BASE_URL;

let uniqueTags = new Map();

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

export const getSolutionsByTag = (tag) => {
  return uniqueTags.get(tag) || [];
};
