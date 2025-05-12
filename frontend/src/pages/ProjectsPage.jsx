import "../styles/PageStyle.css"
import "../styles/ProjectsPage.css"
import Shortcut from "../components/Shortcut";

const ProjectsPage = ({title}) => {


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
            <h2>Projects I have dabbled within</h2>
            <div className="projectsShortcutContainer">
                <Shortcut title="Blog" icon="/blog.png" description="See my blog posts relating to my current interests and hobbies!" path='/blog/' />
                <Shortcut title="Games" icon="none" description="Play a game or two for some short time fun!" path='/games/'/>
            </div>
            <div className="pageFooter">
                <div className="pageBoxDivit pageBoxDivitLeft"> </div>
                <div className="pageBoxDivit pageBoxDivitRight"> </div>
            </div>
        
        </div>
    );
};

export default ProjectsPage;