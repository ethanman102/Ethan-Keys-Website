import React from "react";
import "../styles/SingularProjectsPage.css"
import { useState,useEffect } from "react";
import { apiURL } from "../../constants";
import Loader from "../components/Loader";
import axios from "axios";
import "../styles/CustomScrollbar.css"
import Markdown from "react-markdown"
import { useLocation,useParams } from "react-router-dom";
import "../styles/SingularBlogsPage.css"
import remarkBreaks from "remark-breaks"

const SingularBlogsPage = () => {

    const [blog,setBlog] = useState(null)
    const [loading, setLoading] = useState(true)

    let params = useParams()
    const {state} = useLocation()
    // If we have a state that means we navigated from the blogs list.
    

    useEffect( () => {
        if (!state){
            axios.get(`${apiURL}api/blogs/${params.id}/`)
            .then((response) => {
                setBlog(response.data)
                console.log(response.data)
            })
        } else{
            setBlog(state) // Case where we did navigate from the blogslist page..
        }
        setLoading(false)
        console.log(state)
    },[])

    return(
        <div className="pageContainer">
            <div className="pageTitleContainer">
                <h6 className="pageTitle">Blog #</h6>
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