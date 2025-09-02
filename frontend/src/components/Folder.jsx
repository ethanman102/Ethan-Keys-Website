import React from "react"
import "../styles/Folder.css"
import { useNavigate } from "react-router-dom";
import file from '../assets/file.png'

const Folder = ({projectID,projectTitle}) => {

    let navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`./${projectID}/`)
    }

    return(
    <div className="folderContainer" onClick={handleNavigate}>
        <img className="folderIcon" src={file}/>
        <p className="projectTitle">{projectTitle}</p>
    </div>
    );
}

export default Folder;