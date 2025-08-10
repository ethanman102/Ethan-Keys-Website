import "../styles/PageStyle.css"
import "../styles/ProjectCreation.css"
import "../styles/ToolSelector.css"
import "../styles/CustomScrollbar.css"
import ToolSelector from "../components/ToolSelector"
import ImageDisplay from "../components/ImageDisplay"
import { useState,useEffect } from "react"
import Loader from "../components/Loader"
import instance from "../../api"
import { useParams } from "react-router-dom"

const AdminPageProject = () => {

        let params = useParams()
        let id = params.id

        const [images,setCurrentImages] = useState([])
        const [tools,setTools] = useState([])
        const [title,setTitle] = useState('')
        const [tagline, setTagline] = useState('')
        const [description, setDescription] = useState('')
        const [youtubeID,setYoutubeID] = useState('')
        const [respository,setRepository] = useState('')
        const [createdOn,setCreatedOn] = useState('')




        const [currentDelete,setCurrentDelete] = useState(null)

        const [editting,setEditting] = useState(false)
        const [loading,setLoading] = useState(false)
    
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

        
        useEffect(() => {
            if (id){
            // fetch the item to edit...-
            setLoading(true)
            instance.get(`api/projects/${id}/`).then((response) => response.data)
                .then((project) =>{
                    setCurrentImages(project.images);
                    setYoutubeID(project.youtube_id)
                    setRepository(project.respository)
                    setTitle(project.title)
                    setTagline(project.tagline)
                    setDescription(project.description)
                    setTools(project.tools)
                    setCreatedOn(project.created_on)
                    setLoading(false)
                    setEditting(true)
                }).catch((error) => {
                    // case where there was an error to fetch the project post so we should just navigate to the NON editting URL.
                    let navigate = useNavigate();
                    setLoading(false)
                    navigate('/project')
                    
                })
            }else{
                    setCurrentImages([]);
                    setYoutubeID('')
                    setRepository('')
                    setTitle('')
                    setTagline('')
                    setDescription('')
                    setTools([])
                    setCreatedOn('')
                    setEditting(false)
            }
        },[id])
            
    
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
                            <form onSubmit={handleSubmit}>
            <div className="creationLayout basicScrollbar">
                <h2 className="projectCreationText"> Project {editting ? "Editting" : "Creation"}</h2>
                <p className="projectCreationText">Use the following inputs to {editting ? "edit the" : "create a"} project posting</p>
                <div className="textToolsCreationLayout">
                <div className="contentInputContainer"> 
                    <div className="contentInputHeader">
                        <h5 className="projectInputTitle">Project Information</h5>
                    </div>
                    <div className="projectInputContainer">
                        <div className="inputTopContainer">
                            <div>
                                <label htmlFor="projectTitleInput" className="blockLabel">Title</label>
                                <input className="projectInfoInput" value={title} onChange={(event) => setTitle(event.target.value)}  disabled={loading} id="projectTitleInput" name="title" type="text"/>
                            </div>
                            <div>
                                <label htmlFor="projectSubtitleInput" className="blockLabel">Subtitle</label>
                                <input className="projectInfoInput" disabled={loading} value={tagline} onChange={(event) => setTagline(event.target.value)} id="projectSubtitleInput" name="tagline" type="text"/>
                            </div>
                            <div>
                                <label htmlFor="projectDateInput" className="blockLabel">Creation Date</label>
                                <input className="projectInfoInput" value={createdOn} onChange={(event) => setCreatedOn(event.target.value)} disabled={loading} id="projectDateInput" name="created_on" type="date"/>
                            </div>

                        </div>

                        <label htmlFor="projectDescriptionInput blockLabel">Project Description</label>
                        <textarea className="projectInfoInput" value={description} onChange={(event) => setDescription(event.target.value)}  disabled={loading} id="projectDescriptionInput" name="description" cols="75" rows="25"/>
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
                            <input accept="image/*" disabled={loading} type="file" id="imageUploader" onChange={(event) => uploadFile(event)}/>

                        {images.length > 0 &&
                            <>
                            <label className="imageBlockLabel" htmlFor="imageSelector">Select Image to Delete</label>
                            <select className="deleteSelector" disabled={loading} id="imageSelector" onChange={(event)=>setCurrentDelete(Number(event.target.value))}>
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
                        <input id="projectGithubInput" value={respository} onChange={(event) => setRepository(event.target.value)} name="repository" disabled={loading}  className="projectInfoInput" type="url"/>
                        <label htmlFor="projectGithubInput" className="imageBlockLabel mediaLabel">Youtube Id</label>
                        <input id="projectYoutubeInput" name="youtube_id" value={youtubeID} onChange={(event) => setYoutubeID(event.target.value)} disabled={loading} className="projectInfoInput" type="text"/>
                </div>
                </div>
                </div>
                <input id="createProjectSubmitButton" value={editting ? "Update" : "Create"} disabled={loading} type="submit"/>
            </div>
            </form>
    )
}

export default AdminPageProject;