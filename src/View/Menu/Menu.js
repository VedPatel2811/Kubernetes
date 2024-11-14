import React from "react";
import { getSidebarOptions } from "../../Controller/Menu/MenuController";
import "./Menu.css";

const Menu = () => {
  const options = getSidebarOptions();

  return (
    <aside className="sidebar">
      {options.map((option, index) => (
        <button key={index}>{option}</button>
      ))}
    </aside>
  );
};

export default Menu;
