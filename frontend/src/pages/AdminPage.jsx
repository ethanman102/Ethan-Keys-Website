import "../styles/PageStyle.css"
import "../styles/ProjectCreation.css"
import "../styles/AdminPage.css"
import "../styles/ToolSelector.css"
import "../styles/CustomScrollbar.css"
import ToolSelector from "../components/ToolSelector"
import ImageDisplay from "../components/ImageDisplay"
import { mode } from "../../constants"
import { useState } from "react"

const AdminPage = () =>{

    const [images,setCurrentImages] = useState([])

    const uploadFile = (e) =>{

        let files = e.target.files
        let fileURL = URL.createObjectURL(files[0])
        let data = {
            file: files[0],
            url: fileURL
        }
        setCurrentImages([...images,data])

    }

    return(
        <>
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
            <div className="creationLayout basicScrollbar">
                <h2 className="projectCreationText"> Project Creation</h2>
                <p className="projectCreationText">Use the following inputs to create a project posting</p>
                <div className="textToolsCreationLayout">
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
                <div className="mediaProjectContainer">
                    <ImageDisplay images={images}/>
                    <div className="imageUploadContainer">
                        <h6 className="pageTitle">Image Editor</h6>
                        <form>
                            <input accept="image/*" type="file" onChange={(event) => uploadFile(event)}/>
                        </form>
                    </div>
                </div>
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