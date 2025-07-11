import React from "react";
import { useParams} from "react-router-dom";
import "../styles/SingularProjectsPage.css"
import { useState,useEffect } from "react";
import { apiURL } from "../../constants";
import ImageDisplay from "../components/ImageDisplay";
import Loader from "../components/Loader";


const SingularProjectsPage = () =>{

    let params = useParams();
    let projectID = params.projectID;

    const [loading,setLoading] = useState(true);
    const [project,setProject] = useState({});

    useEffect( () => {
        axios.get(`${apiURL}/api/projects/${projectID}/`)
        .then((response) =>{
            setProject(response.data)
            setLoading(false)
        })
    },[])


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
            {loading ? <Loader message="Loading"/> :  (
                <>
                <div>
                <div className="projectDescriptionLeft">
                    <div className="projectInformationBar">
                        <h6 className="projectInformationHeader">Project Information</h6>
                        <button className="projectInfoX">X</button>
                    </div>

                    <div className="singularProjectTitleContainer">
                        <img src="/InfoBook.png" className="infoIcon"/>
                        <div class="projectTitleText">
                            <h1 className="singularProjectTitle">{project.title}</h1>
                            <h2 className="singularProjectSubtitle">{project.tagline}</h2>
                        </div>
                    </div>
                    <p className="uselessButton">That's Cool!</p>
                </div>
                <div className="projectToolsContainer">
                    <h5 className="projectDescriptionHeader">Tools Used</h5>
                    <div className="toolsUsedTop">
                        <p className="toolsTabs"><u>E</u>plore</p>
                        <p className="toolsTabs"><u>D</u>evelopment</p>
                        <div className=" topDivit"> </div>
                    </div>
                    <div className="projectToolsContainer">
                        { project.repository && 
                        <div className="projectGithub">
                            <img src="/github-mark.png" className="githubLogo"/>
                            <a href={project.repository} className="githubLink">View the Code!</a>
                        </div>
                        }                       
            <div className="pageFooter">
                <div className="pageBoxDivitFull"> </div>
            </div>
                    </div>
                </div>
                </div>
                <div className="projectDescriptionMiddle">
                    <h5 className="projectDescriptionHeader">About The Project</h5>
                    
                    <p className="projectDescriptionBody">
                        {project.youtube_id && <iframe className="projectVideo"  src={`https://www.youtube.com/embed/${project.youtube_id}`}></iframe> }
                        {project.description}</p>
                <div className="pageFooter">
                    <div className="pageBoxDivit pageBoxDivitLeft"> </div>
                    <div className="pageBoxDivit pageBoxDivitRight"> </div>
                </div>
                </div>
                <ImageDisplay/>
                            </>
            )
            }
            </div>
            <div className="pageFooter">
                <div className="pageBoxDivit pageBoxDivitLeft"> </div>
                <div className="pageBoxDivit pageBoxDivitRight"> </div>
            </div>
        
        </div>
    )
}

export default SingularProjectsPage;