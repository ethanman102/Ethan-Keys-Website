import React from "react";
import "../styles/SingularProjectsPage.css"
import { useState,useEffect,useContext } from "react";
import { apiURL } from "../../constants";
import Loader from "../components/Loader";
import axios from "axios";
import "../styles/CustomScrollbar.css"
import Markdown from "react-markdown"
import { useLocation,useParams,useNavigate } from "react-router-dom";
import "../styles/SingularBlogsPage.css"
import remarkBreaks from "remark-breaks"
import { AuthContext } from "../managers/DesktopManager";
import NotFound from "../components/NotFound";


const SingularBlogsPage = () => {

    const [blog,setBlog] = useState({})
    const [loading, setLoading] = useState(true)
    const auth = useContext(AuthContext)

    const [notFound,setNotFound] = useState(false)

    const navigate  = useNavigate()


    let params = useParams()
    const blogID = params.id

    const {state} = useLocation()
    // If we have a state that means we navigated from the blogs list.
    

    useEffect( () => {
        if (!state){
            axios.get(`${apiURL}api/blogs/${params.id}/`)
            .then((response) => {
                setBlog(response.data)

            }).catch((error) => setNotFound(true))
        } else{
            setBlog(state) // Case where we did navigate from the blogslist page..
        }
        setLoading(false)
    },[])

    if (notFound) return <NotFound/>

    return(
        <div className="pageContainer">
            <div className="pageTitleContainer">
                <h6 className="pageTitle">Blog #{blog.id}</h6>
                <div className="pageButtonContainer">
                    <button className="pageButton">_</button>
                    <button className="pageButton">□</button>
                    <button className="pageButton">X</button>
                </div>
            </div>
            <div className="dropDownProjectsTabs">
                <p className="dropdownTab"><u>T</u>his</p>
                <p className="dropdownTab"><u>I</u>s</p>
                <p className="dropdownTab"><u>A</u></p>
                <p className="dropdownTab"><u>B</u>log</p>
                <p className="dropdownTab"><u>P</u>ost</p>
            </div>
            <div className="projectsShortcutContainerList singularBlogContent basicScrollbar">
                {loading ? <Loader message="Loading"/> :
                <>
                <h1 className="singleBlogTitle">{blog.title}</h1>
                <h4 className="singleBlogTitle">{blog.subtitle}</h4>
                <img src={blog.images ? blog.images[0].url : undefined} id="singleBlogPageImage"/>
                <h5 className="singleBlogTitle">Written By: {blog.author} on {new Date(blog.created_on).toString().split(" ").slice(1,4).join(" ")} <br/> {blog.views} Views</h5>
                <div id="markdown">
                    <Markdown remarkPlugins={[remarkBreaks]} children={blog.content}/>
                </div> 
                {auth && <button type="button" id="blogEditButton" onClick={() => navigate(`/adminpage/blog/edit/${blogID}/`)}>Edit</button>}
                </> }
            </div>
            <div className="pageFooter">
                <div className="pageBoxDivit pageBoxDivitLeft"> </div>
                <div className="pageBoxDivit pageBoxDivitRight"> </div>
            </div>
        
        </div>
    );
}

export default SingularBlogsPage