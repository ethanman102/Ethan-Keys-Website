import "../styles/PageStyle.css"
import "../styles/ProjectCreation.css"
import "../styles/AdminPage.css"
import "../styles/ToolSelector.css"
import ToolSelector from "../components/ToolSelector"

const AdminPage = () =>{
    return(
        <>
        <h1>HEYYY</h1>
        <div className="pageContainer">
            <div className="pageTitleContainer">
                <h6 className="pageTitle">Admin</h6>
                <div className="pageButtonContainer">
                    <button className="pageButton">_</button>
                    <button className="pageButton">□</button>
                    <button className="pageButton">X</button>
                </div>
            </div>
            <div className="dropDownProjectsTabs">
                <p className="dropdownTab adminTopTab"><u>P</u>rojects</p>
                <p className="dropdownTab adminTopTab"><u>B</u>logs</p>
                <p className="dropdownTab adminTopTab"><u>T</u>ools</p>
            </div>
            <div className="projectsShortcutContainerList">
                <div className="contentInputContainer"> 
                    <div className="contentInputHeader">
                        <h5 className="projectInputTitle">Project Information</h5>
                    </div>
                    <div className="projectInputContainer">
                        <div className="inputTopContainer">
                            <div>
                                <label for="projectTitleInput" className="blockLabel">Title</label>
                                <input className="projectInfoInput" id="projectTitleInput" type="text"/>
                            </div>
                            <div>
                                <label for="projectSubtitleInput" className="blockLabel">Subtitle</label>
                                <input className="projectInfoInput" id="projectSubtitleInput" type="text"/>
                            </div>
                            <div>
                                <label for="projectDateInput" className="blockLabel">Creation Date</label>
                                <input className="projectInfoInput" id="projectDateInput" type="date"/>
                            </div>

                        </div>

                        <label for="projectDescriptionInput blockLabel">Project Description</label>
                        <textarea className="projectInfoInput" id="projectDescriptionInput" cols="75" rows="25"/>
                    </div>
                </div>
                <ToolSelector/>
            </div>
            <div className="pageFooter">
                <div className="pageBoxDivit pageBoxDivitLeft"> </div>
                <div className="pageBoxDivit pageBoxDivitRight"> </div>
            </div>
        
        </div>
        
        
        </>
    )
}
export default AdminPage