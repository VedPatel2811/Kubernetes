// src/Views/Home/Sidebar.js
import React from 'react';
import { getSidebarOptions } from '../../Controllers/sidebarController';

const Sidebar = () => {
    const options = getSidebarOptions();

    return (
        <aside className="sidebar">
            {options.map((option, index) => (
                <button key={index}>{option}</button>
            ))}
        </aside>
    );
};

export default Sidebar;
