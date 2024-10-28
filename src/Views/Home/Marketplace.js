// src/Views/Home/Marketplace.js
import React from 'react';
import Header from './Header';
import Solutionlist from './Solutionlist';
import Sidebar from './Sidebar';
import '../../styles.css';

const Marketplace = () => {
    return (
        <div className="marketplace-container">
            <Header />
            <div className="main-layout">
                <Sidebar />
                <div className="content">
                    <Solutionlist />
                </div>
            </div>
        </div>
    );
};

export default Marketplace;
