import {MoonLoader, } from "react-spinners";
import React from "react";
import "../animations/Wave.css"
import "../styles/Loader.css"

const Loader = ({message}) => {

    const delay = 250

    return(
        <div className="loaderContainer">
            <MoonLoader speedMultiplier={0.25} className="loadingIcon"/>
            <p className="loadingMessage">
                {message.split('').map((letter,i) =>
                    <span key={i} style={{animation:"wave 2s ease infinite", animationDelay:`${delay * i}ms`, display:"inline-block"}}>{letter}</span>    
                )}
            </p>
        </div>
    );
}

export default Loader;