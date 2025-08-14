import React, { useRef } from "react"
import { useState,useEffect } from "react"
import Markdown from "react-markdown"
import remarkBreaks from "remark-breaks"
import "../styles/BlogCreation.css"
import DeleteModal from "../components/DeleteModal"
import { apiURL,pathNames } from "../../constants"
import Loader from "../components/Loader"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import instance from "../../api"


const AdminPageBlog = () => {

    let params = useParams();
    let id = params.id;

    const {unauthorize} = useOutletContext()

    const [image,setImage] = useState(undefined)
    const [content,setContent] = useState('')
    const [title,setTitle] = useState('')
    const [author,setAuthor] = useState('')
    const [subtitle,setSubtitle] = useState('')

    const editImageRef = useRef(null)


    const [editting,setEditting] = useState(false); // to allow for editting modes
    const [loading,setLoading] = useState(false)
    const [deleteOpen,setDeleteOpen] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (id){
        // fetch the item to edit...-
        setLoading(true)
        instance.get(`api/blogs/${id}/`).then((response) => response.data)
            .then((blog) =>{
                setImage((blog.images && blog.images.length >0) ? blog.images[0] : undefined);
                setContent(blog.content)
                setTitle(blog.title)
                setAuthor(blog.author)
                setSubtitle(blog.subtitle)
                setEditting(true)
                setLoading(false)
            }).catch((error) => {
                // case where there was an error to fetch the blog post so we should just navigate to the NON editting URL.
                let navigate = useNavigate();
                setLoading(false)
                navigate('/blog')
                unauthorize()
                
            })
        }else{
            setImage(undefined)
            setContent("")
            setTitle("")
            setAuthor("")
            setSubtitle("")
            setEditting(false)
        }
    },[id])

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
        if (editting){
            editImageRef.current = data
            setImage(editImageRef.current)
        }       
    }

    const postBlog = (event) => {
        event.preventDefault()
        let formData = new FormData(event.currentTarget)
        
        if (!editting){ // case where we can just add the image to the image files... cus we are calling POST
            formData.append('image',image.file)
        } else{
            // case where we are editting and the images will have images without an image. file so we have to seperate them out!
            if (!image.file) formData.append('image',image) // previous images that are kept
            else formData.append('new_image',editImageRef.current.file)
        }

        // Now we can post to the api route!
        if (!editting){
            instance.post('api/blogs/',formData,{
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            }).then((response) => {
                let newID = response.data.id
                setLoading(false)
                navigate(`/${pathNames.blog}/${newID}/`)
            }).catch((error) => {
                setLoading(false)
                unauthorize()
                navigate('/admin/')
                 // case where we failed to post because of axios error!
            })
        } else {
            // case where we were editting
            instance.put(`api/blogs/${id}/`,formData,{
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            }).then((response) => {
                setLoading(false)
                navigate(`/${pathNames.blog}/${id}/`)
            }).catch((error) => {
                setLoading(false)
                unauthorize()
                navigate('/admin/')
            })
        }

        
    }

    const handleDelete = () => {
        if (!editting) return; // allows us to prevent a future development error if a user tries to delete something in non-edit mode :D
        setLoading(true)
        setDeleteOpen(false)
        instance.delete(`api/blogs/${id}/`).then((response) => {
            setLoading(false)
            navigate('/admin/')
        }).catch((error) => {
            setLoading(false)
            unauthorize()
            navigate('/admin/')
        })
    }

    return(
        <form onSubmit={postBlog}>
            {deleteOpen && <DeleteModal deleting={`Blog ${id}`} visibilityCallback={setDeleteOpen} deleteCallback={handleDelete}/>}
        <div className="adminBlogPageContainer basicScrollbar">
            <h2 className="">Blog {editting ? "Editting" : "Creation"}</h2>
            <p className="">Use the following inputs to {editting ? "edit the" : "create a"} Blog Post</p>

                    <div className="blogCreationInputContainer">
            
                <h5 id="createBlogTitle">Media</h5>
                <div id="blogMediaContainer">
                <label htmlFor="blogInputAuthor" className="blockLabel">Author</label>
                <input  type="text" disabled={loading} name="author" value={author} onChange={(event) => setAuthor(event.target.value)} id="blogInputAuthor" className="blogCreateInput"/>

                <label htmlFor="blogInputTitle" className="blockLabel">Title</label>
                <input type="text" disabled={loading} name="title" value={title} onChange={(event) => setTitle(event.target.value)} id="blogInputTitle" className="blogCreateInput"/>

                <label htmlFor="blogInputSubtitle" className="blockLabel">Subtitle</label>
                <input type="text" disabled={loading} name="subtitle" value={subtitle} onChange={(event) => setSubtitle(event.target.value)} id="blogInputSubtitle" className="blogCreateInput"/>

                
                <label htmlFor="blogImageUploader" className="blockLabel">Upload Image</label>
                <input accept="image/*" type="file" id="blogImageUploader" disabled={loading} className="blockLabel blogCreateInput" onChange={(event) => uploadFile(event)}/>
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
                    <textarea name="content" value={content} disabled={loading} id="markdownInput" onChange={(event) => handleContent(event)}/>
                </section>
                <section className="markdownEditorSection sectionRight">
                    <h4>Markdown Output</h4>
                    <Markdown remarkPlugins={[remarkBreaks]} children={content}/>
                </section>
            </div>     
        </div>
                </div>
      

                <input type="submit" disabled={loading} value={editting ? "Update" : "Post"} id="blogSubmit"/>
                {editting && <button disabled={loading} onClick={() => setDeleteOpen(true)} type="button">Delete</button>}
            </div>
            </form>
 
    )
}
export default AdminPageBlog