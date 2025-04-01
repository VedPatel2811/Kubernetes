import React, { useState, useEffect } from "react";
import { getUniqueTags, fetchAllSolutions } from "../../services/api";
import "./Menu.css";

const Menubar = ({ onTagSelect }) => {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      await fetchAllSolutions();
      const uniqueTags = getUniqueTags();
      setTags(uniqueTags);
    };

    loadData();
  }, []);

  const handleTagClick = (tag) => {
    if (selectedTag === tag.tag) {
      setSelectedTag(null);
      onTagSelect(null);
    } else {
      // Select the new tag
      setSelectedTag(tag.tag);
      onTagSelect(tag.ids);
    }
  };

  return (
    <div className="menu-container">
      <nav className="menu">
        {tags.map((tag, index) => (
          <div
            key={index}
            className={`menu-item ${selectedTag === tag.tag ? "selected" : ""}`}
            onClick={() => handleTagClick(tag)}
          >
            {tag.tag}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Menubar;
