import React from "react";
import { useParams } from "react-router-dom";
import "../styles/SingularProjectsPage.css"

const SingularProjectsPage = () =>{

    let params = useParams();
    let projectID = params.projectID;


    return(
        <div className="pageContainer">
            <div className="pageTitleContainer">
                <h6 className="pageTitle">Project {projectID}</h6>
                <div className="pageButtonContainer">
                    <button className="pageButton">_</button>
                    <button className="pageButton">□</button>
                    <button className="pageButton">X</button>
                </div>
            </div>
            <div className="dropDownProjectsTabs">
                <p className="dropdownTab"><u>T</u>ake</p>
                <p className="dropdownTab"><u>A</u></p>
                <p className="dropdownTab"><u>G</u>ood</p>
                <p className="dropdownTab"><u>L</u>ook</p>
                <p className="dropdownTab">A<u>t</u></p>
                <p className="dropdownTab">T<u>h</u>is</p>
            </div>
            <div className="projectsShortcutContainer">
                <div className="projectDescriptionLeft">
                <h6 className="projectInformationHeader">Project Information</h6>
                <div className="singularProjectTitleContainer">
                    <h1 className="singularProjectTitle">Project Title</h1>
                    <h2 className="singularProjectSubtitle">Project Type</h2>
                </div>
                <div className="projectTools">
                    <p>The following tools were utilized to satisy this project<br/>and it's requirements</p>
                </div>
                </div>
            </div>
            <div className="pageFooter">
                <div className="pageBoxDivit pageBoxDivitLeft"> </div>
                <div className="pageBoxDivit pageBoxDivitRight"> </div>
            </div>
        
        </div>
    )
}

export default SingularProjectsPage;