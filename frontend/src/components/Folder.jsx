import React from "react"
import "../styles/Folder.css"
import { useNavigate } from "react-router-dom";

const Folder = ({projectID,projectTitle}) => {

    let navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`./${projectID}/`)
    }

    return(
    <div className="folderContainer" onClick={handleNavigate}>
        <img className="folderIcon" src="/file.png"/>
        <p className="projectTitle">{projectTitle}</p>
    </div>
    );
}

export default Folder;