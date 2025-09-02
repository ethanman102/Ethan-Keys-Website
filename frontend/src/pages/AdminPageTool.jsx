import "../styles/ToolCreation.css"
import { useState,useEffect } from "react"
import Tool from "../components/Tool"
import "../styles/PageStyle.css"
import { toolTypes } from "../../constants"
import "../styles/CustomScrollbar.css"
import instance from "../../api"
import DeleteModal from "../components/DeleteModal"
import { useOutletContext,useNavigate,useParams } from "react-router-dom"

const AdminPageTool = () => {

    let params = useParams()
    let id = params.id
    const [tools,setTools] = useState([])
    const [currentToolImage,setCurrentToolImage] = useState(null)

    const [name,setName] = useState('')
    const [type,setType] = useState('')

    const {unauthorize} = useOutletContext()

    const [editting,setEditting] = useState(false)
    const [loading,setLoading] = useState(false)

    const [deleteOpen,setDeleteOpen] = useState(false)

    const navigate = useNavigate()


    const uploadFile = (e) => {
        let files = e.target.files
        let fileURL = URL.createObjectURL(files[0])
        let data = {
                file: files[0],
                url: fileURL
            }
        setCurrentToolImage(data)       
    }

    const handleDelete = () => {
            if (!editting) return; // allows us to prevent a future development error if a user tries to delete something in non-edit mode :D
            setLoading(true)
            setDeleteOpen(false)
            instance.delete(`api/tools/${id}/`).then((response) => {
                setLoading(false)
                navigate('/admin/')
            }).catch((error) => {
                setLoading(false)
                unauthorize()
                navigate('/admin/')
            })        
    }

    const createTool = (event) => {
        event.preventDefault()
        let formData = new FormData(event.currentTarget)
        if (!editting){ // case where we can just add the image to the image files... cus we are calling POST
            formData.append('images',currentToolImage.file)
        } else{
            // case where we are editting and the images will have images without an image. file so we have to seperate them out!
            if (!currentToolImage.file) formData.append('images',currentToolImage) // previous images that are kept
            else formData.append('new_image',currentToolImage.file)
        }

        if (!editting){
                instance.post('api/tools/',formData,{
                    headers : {
                        'Content-Type' : 'multipart/form-data'
                    }
                }).then((response) => {
                    setTools([...tools,response.data])
                    setLoading(false)
                    setName('')
                    setType('')
                    setCurrentToolImage(undefined)
                }).catch((error) => {
                    setLoading(false)
                    navigate('/adminpage/') // case where we failed to post because of axios error!
                })
            } else {
                // case where we were editting
                instance.put(`api/tools/${id}/`,formData,{
                    headers : {
                        'Content-Type' : 'multipart/form-data'
                    }
                }).then((response) => {
                    setLoading(false)
                    let newArray = [...tools]
                    newArray = newArray.filter((currentTool) => currentTool.id !== response.data.id)
                    newArray.push(response.data)
                    setTools(newArray)
                }).catch((error) => {
                    setLoading(false)
                    navigate('/adminpage/')
                })
            }
    }

    useEffect(
        () => {
           instance.get('api/tools/').then((response) => {
            setTools(response.data.tools)
           })
           
           if (id){
            setEditting(true)
            setLoading(true)
            instance.get(`api/tools/${id}/`).then((response) =>{
                setName(response.data.name)
                setType(response.data.type)
                setCurrentToolImage(response.data.image)
            }).then(() => setLoading(false)).catch((error) => {
                setLoading(false)
                navigate('/admin/')
            })

           }
           
        }, [id]
    )

    return(
        <div className="adminToolPageContainer basicScrollbar">
                        {deleteOpen && <DeleteModal deleting={`Tool ${id}`} visibilityCallback={setDeleteOpen} deleteCallback={handleDelete}/>}  
                <h2 className="">Tool {editting ? "Editting" : "Creation"}</h2>
                <p className="">Use the following inputs to {editting ? "edit" : "create"} a tool</p>
                        <div className="pageContainer">
            <div className="pageTitleContainer">
                <h6 className="pageTitle">Current Tools</h6>
                <div className="pageButtonContainer">
                    <button className="pageButton">_</button>
                    <button className="pageButton">□</button>
                    <button className="pageButton">X</button>
                </div>
            </div>
            <div className="dropDownProjectsTabs">
                <p className="dropdownTab"><u>T</u>hese</p>
                <p className="dropdownTab"><u>A</u>re</p>
                <p className="dropdownTab"><u>Y</u>our</p>
                <p className="dropdownTab"><u>C</u>urrent</p>
                <p className="dropdownTab">T<u>o</u>ols</p>

            </div>
            <div className="projectsShortcutContainerList toolPageContainer basicScrollbar">
                        {tools.map((tool) => {
                                return <div><Tool name={tool.name} icon={tool.image.url} type={tool.type}/>{tool.id != id &&<button id="toolEditButton" disabled={loading} onClick={() => navigate(`edit/${tool.id}/`)} type="button">Edit</button>} </div>
                        })
                        }
            </div>
            <div className="pageFooter">
                <div className="pageBoxDivit pageBoxDivitLeft"> </div>
                <div className="pageBoxDivit pageBoxDivitRight"> </div>
            </div>
        
        </div>
        <div className="toolCreationInputContainer">
            <h5 id="createToolTitle">{editting ? "Edit" : "Create"} Tool</h5>
            <form id="toolEditorForm" className="basicScrollbar" onSubmit={createTool}>
                <label htmlFor="toolNameInput" className="toolBlockLabel">Name</label>
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} id="toolNameInput" disabled={loading} className="toolCreateInput"/>
                <label htmlFor="toolNameInput" className="toolBlockLabel">Tool Type</label>
                <select disabled={loading} name="type" value={type ? type : 'FRONTEND'} onChange={(e) => setType(e.target.value)} className="toolCreateInput">
                    <option value={toolTypes.FRONTEND}>{toolTypes.FRONTEND}</option>
                    <option value={toolTypes.BACKEND}>{toolTypes.BACKEND}</option>
                </select>
                
                <label htmlFor="toolImageUploader" className="toolBlockLabel">Upload Image</label>
                <input accept="image/*" type="file" id="imageUploader" disabled={loading} className="toolBlockLabel toolCreateInput" onChange={(event) => uploadFile(event)}/>
                <img id="currentToolImageDisplay" src={currentToolImage ? currentToolImage.url : undefined}/>
                <input id="toolSubmit" disabled={loading} type="submit"/>
            </form>
            
            <div className="pageFooter">
                <div className="pageBoxDivit pageBoxDivitLeft"> </div>
                <div className="pageBoxDivit pageBoxDivitRight"> </div>
            </div>
            
        </div>
        {editting && <button disabled={loading} id="deleteTool" onClick={() => setDeleteOpen(true)} type="button">Delete</button>}
        </div>
    )
}
export default AdminPageTool