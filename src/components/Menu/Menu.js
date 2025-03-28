import React from "react";
import "./Menu.css";

const options = [
  "Option-1",
  "Option-2",
  "Option-3",
  "Option-4",
  "Option-5",
  "Option-6",
  "Option-7",
];

const Menubar = () => {
  return (
    <div className="menu-container">
      <nav className="menu">
        {options.map((option, index) => (
          <div key={index} className="menu-item">
            {option}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Menubar;
