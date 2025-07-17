import "../styles/PageStyle.css"
import "../styles/ProjectCreation.css"
import "../styles/AdminPage.css"
import "../styles/ToolSelector.css"
import "../styles/CustomScrollbar.css"
import ToolSelector from "../components/ToolSelector"
import ImageDisplay from "../components/ImageDisplay"
import { useState,useEffect } from "react"

const AdminPage = () =>{

    const [images,setCurrentImages] = useState([])
    const [currentDelete,setCurrentDelete] = useState(null)

    const uploadFile = (e) =>{

        let files = e.target.files
        let fileURL = URL.createObjectURL(files[0])
        let data = {
            file: files[0],
            url: fileURL
        }
        setCurrentImages([...images,data])

    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let formData = new FormData(event.currentTarget)
        images.forEach((image) => {
            formData.append('images',image.file)
        })

    }

    useEffect(() => {
        if (images.length > 0) setCurrentDelete(0)
        else setCurrentDelete(null)
    },[images])

    const handleRemove = () => {
        let updatedImages = [...images]
        updatedImages.splice(currentDelete,1)
        setCurrentImages(updatedImages)
        if (updatedImages.length > 0) {
            setCurrentDelete(0)  
        } else {
            setCurrentDelete(null)
        }
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
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
                                <input className="projectInfoInput" id="projectTitleInput" name="title" type="text"/>
                            </div>
                            <div>
                                <label for="projectSubtitleInput" className="blockLabel">Subtitle</label>
                                <input className="projectInfoInput" id="projectSubtitleInput" name="tagline" type="text"/>
                            </div>
                            <div>
                                <label for="projectDateInput" className="blockLabel">Creation Date</label>
                                <input className="projectInfoInput" id="projectDateInput" name="creation_date" type="date"/>
                            </div>

                        </div>

                        <label for="projectDescriptionInput blockLabel">Project Description</label>
                        <textarea className="projectInfoInput" id="projectDescriptionInput" name="description" cols="75" rows="25"/>
                    </div>
                </div>
                <ToolSelector/>
                </div>
                <div className="mediaProjectContainer">
                    <ImageDisplay images={images}/>
                    <div className="mediaProjectRight">
                    <div className="imageUploadContainer">
                        <div className="imageUploadContainerHeader">
                        <h6 className="pageTitle imagePageTitle">Image Editor</h6>
                    
                    <div className="pageButtonContainerImage">

                    <button className="pageButton">X</button>
                </div>
                </div>
                        <div className="imageInnerContainer">

                            <label htmlFor="imageUploader" className="imageBlockLabel">Upload Image</label>
                            <input accept="image/*" type="file" id="imageUploader" onChange={(event) => uploadFile(event)}/>

                        {images.length > 0 &&
                            <>
                            <label className="imageBlockLabel" htmlFor="imageSelector">Select Image to Delete</label>
                            <select className="deleteSelector" id="imageSelector" onChange={(event)=>setCurrentDelete(Number(event.target.value))}>
                                {images.map((_,i) => <option key={i} value={i}>{i+1}</option>)}
                            </select>
                            {currentDelete !== null && <button type="button" className="imageRemoveButton" onClick={handleRemove}>Remove</button>}
                            </>
                        }
                    </div>
                                <div className="pageFooter">
                <div className="pageBoxDivit pageBoxDivitLeft"> </div>
                <div className="pageBoxDivit pageBoxDivitRight"> </div>
                </div>
                    </div>
                <div className="externalLinkUploader">
                    <div className="externalLinkUploaderTitle">
                        <h6 className="pageTitle">External Media</h6>
                            <div className="pageButtonContainer">
                                <button className="pageButton">_</button>
                                <button className="pageButton">□</button>
                                <button className="pageButton">X</button>
                            </div>
                    </div>
                        <label htmlFor="projectGithubInput" className="imageBlockLabel mediaLabel"><img src="/github-mark.png" id="externalGithubImage"/>Github Repo</label>
                        <input id="projectGithubInput"  className="projectInfoInput" type="url"/>
                        <label htmlFor="projectGithubInput" className="imageBlockLabel mediaLabel">Youtube Id</label>
                        <input id="projectYoutubeInput" className="projectInfoInput" type="text"/>
                </div>
                </div>
                </div>
                <input id="createProjectSubmitButton" type="submit"/>
            </div>
     
            <div className="pageFooter">
                <div className="pageBoxDivit pageBoxDivitLeft"> </div>
                <div className="pageBoxDivit pageBoxDivitRight"> </div>
            </div>
        
        </div>
        </form>
        
        </>
    )
}
export default AdminPage