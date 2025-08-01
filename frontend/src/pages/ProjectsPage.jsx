import "../styles/PageStyle.css"
import "../styles/ProjectsPage.css"
import Folder from "../components/Folder";
import axios from "axios";
import { useEffect,useState } from "react";
import { apiURL } from "../../constants";
import Loader from "../components/Loader";


const ProjectsPage = ({title}) => {

    const [projects,setProjects] = useState([]); // Empty projects until all are fetched
    const [loading,setLoading] = useState(true);

    useEffect( () => {
        axios.get(`${apiURL}/api/projects/`)
        .then((response) =>{
            setProjects(response.data.projects)
            setLoading(false)
        })
    },[])

    return(
        <div className="pageContainer">
            <div className="pageTitleContainer">
                <h6 className="pageTitle">{title}</h6>
                <div className="pageButtonContainer">
                    <button className="pageButton">_</button>
                    <button className="pageButton">□</button>
                    <button className="pageButton">X</button>
                </div>
            </div>
            <div className="dropDownProjectsTabs">
                <p className="dropdownTab"><u>S</u>ee</p>
                <p className="dropdownTab">S<u>o</u>me</p>
                <p className="dropdownTab"><u>O</u>f</p>
                <p className="dropdownTab"><u>M</u>y</p>
                <p className="dropdownTab"><u>N</u>ewest</p>
                <p className="dropdownTab"><u>P</u>rojects</p>
            </div>
            <div className="projectsShortcutContainerList">
                
                {loading ? <Loader message="Loading"/> : projects.map((project) => 
                    <Folder key={project.id} projectID={project.id} projectTitle={project.title}/>
                )}
            </div>
            <div className="pageFooter">
                <div className="pageBoxDivit pageBoxDivitLeft"> </div>
                <div className="pageBoxDivit pageBoxDivitRight"> </div>
            </div>
        
        </div>
    );
};

export default ProjectsPage;