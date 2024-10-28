// src/Views/Home/Header.js
import React from 'react';

const Header = () => {
    return (
        <header className="header">
            <h1>Marketplace</h1>
            <div className="header-search">
                <span className="search-icon">🔍</span>
                <input type="text" placeholder="Search" />
            </div>
            <div className="header-buttons">
                <button>Models</button>
                <button>Datasets</button>
                <button>Objects</button>
            </div>
        </header>
    );
};

export default Header;
