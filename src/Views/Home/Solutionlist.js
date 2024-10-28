// src/Views/Home/Solutionlist.js
import React, { useEffect, useState } from 'react';
import { getSolutions } from '../../Controllers/solutionController';
import '../../styles.css';

const Solutionlist = () => {
    const [solutions, setSolutions] = useState([]);

    useEffect(() => {
        const data = getSolutions();
        setSolutions(data);
    }, []);

    return (
        <div className="content">
            {solutions.map((solution) => (
                <div key={solution.id} className="solution-card">
                    <h3>{solution.title}</h3>
                    <p>{solution.meta}</p>
                </div>
            ))}
        </div>
    );
};

export default Solutionlist;
