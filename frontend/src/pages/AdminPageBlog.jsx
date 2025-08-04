import React from "react"
import { useState } from "react"
import Markdown from "react-markdown"
import remarkBreaks from "remark-breaks"
import "../styles/BlogCreation.css"
import axios from "axios"
import { apiURL } from "../../constants"


const AdminPageBlog = () => {

    const [image,setImage] = useState(undefined)
    const [content,setContent] = useState('')

    const handleContent = (event) => {
        setContent(event.target.value)
    }

    const uploadFile = (e) => {
        let files = e.target.files
        let fileURL = URL.createObjectURL(files[0])
        let data = {
                file: files[0],
                url: fileURL
            }
        setImage(data)       
    }

    const postBlog = (event) => {
        event.preventDefault()
        let formData = new FormData(event.currentTarget)
        formData.append('image',image.file)
    }

    return(
        <form onSubmit={postBlog}>
        <div className="adminBlogPageContainer basicScrollbar">
            <h2 className="">Blog Creation</h2>
            <p className="">Use the following inputs to create a Blog Post</p>

                    <div className="blogCreationInputContainer">
            
                <h5 id="createBlogTitle">Media</h5>
                <div id="blogMediaContainer">
                <label htmlFor="blogInputAuthor" className="blockLabel">Author</label>
                <input type="text" name="author" id="blogInputAuthor" className="blogCreateInput"/>

                <label htmlFor="blogInputTitle" className="blockLabel">Title</label>
                <input type="text" name="title" id="blogInputTitle" className="blogCreateInput"/>

                <label htmlFor="blogInputSubtitle" className="blockLabel">Subtitle</label>
                <input type="text" name="subtitle" id="blogInputSubtitle" className="blogCreateInput"/>

                
                <label htmlFor="blogImageUploader" className="blockLabel">Upload Image</label>
                <input accept="image/*" type="file" id="blogImageUploader" className="blockLabel blogCreateInput" onChange={(event) => uploadFile(event)}/>
                <img id="currentBlogImageDisplay" src={image ? image.url : undefined}/>
            </div>
            <div className="pageFooter">
                <div className="pageBoxDivit pageBoxDivitLeft"> </div>
                <div className="pageBoxDivit pageBoxDivitRight"> </div>
            </div>
        </div>
                <div id="markdownCurrentContainer">
            <div className="pageContainer">
            <div className="pageTitleContainer">
                <h6 className="pageTitle">Blog Content</h6>
                <div className="pageButtonContainer">
                    <button className="pageButton">_</button>
                    <button className="pageButton">□</button>
                    <button className="pageButton">X</button>
                </div>
            </div>
            <div className="projectsShortcutContainerList markdownEditor">
                <section className="markdownEditorSection sectionLeft">
                    <h4>Markdown Editor</h4>
                    <textarea name="content" id="markdownInput" onChange={(event) => handleContent(event)}/>
                </section>
                <section className="markdownEditorSection sectionRight">
                    <h4>Markdown Output</h4>
                    <Markdown remarkPlugins={[remarkBreaks]} children={content}/>
                </section>
            </div>     
        </div>
                </div>
      

                <input type="submit" value="Post" id="blogSubmit"/>
            </div>
            </form>
 
    )
}
export default AdminPageBlog