import React from "react";
import { useParams } from "react-router-dom";
import "../styles/SingularProjectsPage.css"

import ImageDisplay from "../components/ImageDisplay";


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
                    <div className="projectInformationBar">
                        <h6 className="projectInformationHeader">Project Information</h6>
                        <button className="projectInfoX">X</button>
                    </div>

                    <div className="singularProjectTitleContainer">
                        <img src="/InfoBook.png" className="infoIcon"/>
                        <div class="projectTitleText">
                            <h1 className="singularProjectTitle">Project Title</h1>
                            <h2 className="singularProjectSubtitle">Project Type</h2>
                        </div>
                    </div>
                    <p className="uselessButton">That's Cool!</p>
                </div>
                <div className="projectDescriptionMiddle">
                    <h5 className="projectDescriptionHeader">About The Project</h5>
                    <p className="projectDescriptionBody">orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <div className="pageFooter">
                    <div className="pageBoxDivit pageBoxDivitLeft"> </div>
                    <div className="pageBoxDivit pageBoxDivitRight"> </div>
                </div>
                </div>
                <ImageDisplay/>
            </div>
            <div className="pageFooter">
                <div className="pageBoxDivit pageBoxDivitLeft"> </div>
                <div className="pageBoxDivit pageBoxDivitRight"> </div>
            </div>
        
        </div>
    )
}

export default SingularProjectsPage;