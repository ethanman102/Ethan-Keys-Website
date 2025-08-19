import "../styles/ToolCreation.css"
import { useState,useEffect } from "react"
import Tool from "../components/Tool"
import "../styles/PageStyle.css"
import { toolTypes } from "../../constants"
import "../styles/CustomScrollbar.css"
import instance from "../../api"

const AdminPageTool = () => {

    const [tools,setTools] = useState([])
    const [currentToolImage,setCurrentToolImage] = useState(null)

    const [editting,setEditting] = useState(false)
    const [loading,setLoading] = useState(false)

    const uploadFile = (e) => {
        let files = e.target.files
        let fileURL = URL.createObjectURL(files[0])
        let data = {
                file: files[0],
                url: fileURL
            }
        setCurrentToolImage(data)       
    }

    const createTool = (event) => {
        event.preventDefault()
        let formData = new FormData(event.currentTarget)
        formData.append('images',currentToolImage.file)

        if (!editting){
                instance.post('api/tools/',formData,{
                    headers : {
                        'Content-Type' : 'multipart/form-data'
                    }
                }).then((response) => {
                    let newID = response.data.id
                    setLoading(false)
                }).catch((error) => {
                    setLoading(false)
                    navigate('/admin/') // case where we failed to post because of axios error!
                })
            } else {
                // case where we were editting
                instance.put(`api/tools/${id}/`,formData,{
                    headers : {
                        'Content-Type' : 'multipart/form-data'
                    }
                }).then((response) => {
                    setLoading(false)
                }).catch((error) => {
                    setLoading(false)
                    navigate('/admin/')
                })
            }
    }

    useEffect(
        () => {
           instance.get('api/tools/').then((response) => {
            setTools(response.data.tools)
            console.log(response.data)
           })
           // retrieve all tools!
        }, []
    )

    return(
        <div className="adminToolPageContainer basicScrollbar">
                <h2 className="">Tool Creation</h2>
                <p className="">Use the following inputs to create a tool</p>
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
                                return <Tool name={tool.name} icon={tool.image.url} type={tool.type}/> 
                        })
                        }
            </div>
            <div className="pageFooter">
                <div className="pageBoxDivit pageBoxDivitLeft"> </div>
                <div className="pageBoxDivit pageBoxDivitRight"> </div>
            </div>
        
        </div>
        <div className="toolCreationInputContainer">
            <h5 id="createToolTitle">Create Tool</h5>
            <form id="toolEditorForm" className="basicScrollbar" onSubmit={createTool}>
                <label htmlFor="toolNameInput" className="toolBlockLabel">Name</label>
                <input type="text" name="name" id="toolNameInput" className="toolCreateInput"/>
                <label htmlFor="toolNameInput" className="toolBlockLabel">Tool Type</label>
                <select name="type" defaultValue={toolTypes.FRONTEND} className="toolCreateInput">
                    <option value={toolTypes.FRONTEND}>{toolTypes.FRONTEND}</option>
                    <option value={toolTypes.BACKEND}>{toolTypes.BACKEND}</option>
                </select>
                
                <label htmlFor="toolImageUploader" className="toolBlockLabel">Upload Image</label>
                <input accept="image/*" type="file" id="imageUploader" className="toolBlockLabel toolCreateInput" onChange={(event) => uploadFile(event)}/>
                <img id="currentToolImageDisplay" src={currentToolImage ? currentToolImage.url : undefined}/>
                <input id="toolSubmit" type="submit"/>
            </form>
            <div className="pageFooter">
                <div className="pageBoxDivit pageBoxDivitLeft"> </div>
                <div className="pageBoxDivit pageBoxDivitRight"> </div>
            </div>
        </div>
        </div>
    )
}
export default AdminPageTool