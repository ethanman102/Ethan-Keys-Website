import React from "react"
import "../styles/Blurb.css"

const Blurb = ({title,message}) => {

    return(
        <div className="blurbBox">
            <div className="blurbTitleContainer">
                <h6 className="blurbTitle">{title}</h6>
                <div className="blurbButtonContainer">
                <button className="blurbButton">_</button>
                <button className="blurbButton">□</button>
                <button className="blurbButton">X</button>
                </div>
            </div>
            <p className="blurbMessage">{message}</p>
        </div>
    )
}

export default Blurb;