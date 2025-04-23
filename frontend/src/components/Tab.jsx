import React from "react"
import "../styles/Tab.css"


const Tab = ({title,icon}) => {

    return (
        <div className="tabContainer">
            <img className="tabImage" src={icon}/>
            <p className="tabTitle">{title}</p>
            <button className="closeTabButton">X</button>
        </div>
    )
}


export default Tab;
