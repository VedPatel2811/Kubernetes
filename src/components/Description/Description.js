import React from "react";
import "./Description.css";
import { useParams } from "react-router-dom";
import { solutions } from "../Content/Content";

const Description = () => {
    const { id } = useParams();
    const solution = solutions.find((s) => s.id === parseInt(id));

    return (
        <div className="description">
            <header className="description-header">
                <h1>{solution.title}</h1>
                <button className="description-download">Download</button>
            </header>

            <div className="description-content">
                <section className="description-link">
                    <h3>Link</h3>
                    <a href="https://github.com/meta-llama/llama" target="_blank" rel="noopener noreferrer">
                        www.GitHub.com/{solution.title}!
                    </a>
                </section>

                <section className="description-details">
                    <h3>Description</h3>
                    <p>Welcome to {solution.title}! 🚀</p>
                    <p>
                        {solution.title} is a powerful, lightweight library designed to make your life easier by providing intuitive APIs and robust features for your use-case.
                    </p>
                    <ul>
                        <li>Easy to use and well-documented</li>
                        <li>Lightweight with high performance</li>
                        <li>Supports multiple frameworks and platforms</li>
                        <li>Modular and extensible</li>        
                    </ul>
                </section>

                <section className="description-how-to-use">
                    <h3>How to Use</h3>
                    <p>Follow the steps below to set up the library in your environment:</p>
                    <pre>
                        <code>pip install yourlibraryname  # For Python</code>
                    </pre>
                    <pre>
                        <code>
                            {`from yourlibraryname import feature\n\nresult = feature.do_something_awesome("your input")\nprint(result)`}
                        </code>
                    </pre>
                </section>
            </div>
        </div>
    );
};

export default Description;
