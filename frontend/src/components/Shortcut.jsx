import React from "react"
import {useNavigate} from "react-router-dom"

const Shortcut = ({title,icon}) => {

    return (
        <div className="shortcutContainer">
            <img className="shortcutImage" src={icon} />
            <h5>{title}</h5>
        </div>
    );
}

export default Shortcut