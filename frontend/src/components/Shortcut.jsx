import React from "react"
import "../styles/Shortcut.css"

const Shortcut = ({title,icon}) => {

    return (
        <div className="shortcutContainer">
            <img className="shortcutImage" src={icon} />
            <h5 className="shortcutTitle">{title}</h5>
        </div>
    );
}

export default Shortcut