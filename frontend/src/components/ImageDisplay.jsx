import React from "react";
import "../styles/ImageDisplay.css"

const ImageDisplay = () => {
    return(
        <div className="imageDisplayContainer">
            <div className="imageDisplayToolbar">
                <p className="imageDisplayHeader">untitled - Pictures</p>
                <div className="imageDisplayButtons">
                    <button className="idbutton">_</button>
                    <button className="idbutton">□</button>
                    <button className="idbutton">X</button>
                </div>
            </div>

        </div>
    )
}

export default ImageDisplay;