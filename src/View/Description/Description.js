import React from "react";
import "./Description.css";
import { useParams } from "react-router-dom";
const Description =  () => {
    const id = useParams();
    return(
        <div>
            <h1>Hello Description</h1>
        </div>
    );
};

export default Description;