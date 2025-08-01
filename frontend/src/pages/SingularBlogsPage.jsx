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
    const [loading, setLoading] = useState(false)

    let params = useParams()
    const {state} = useLocation() // If we have a state that means we navigated from the blogs list.

    useEffect( () => {
        if (!state){
            axios.get(`${apiURL}/api/blogs/${params.id}/`)
            .then((response) => {
                setBlog(response.data)
                setLoading(false)
            })
        } else{
            setBlog(state) // Case where we did navigate from the blogslist page..
        }
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
            <div className="projectsShortcutContainerList singularBlogContent">
                <h1 className="singleBlogTitle">This is Where the Blog Title will Go</h1>
                <h4 className="singleBlogTitle">This is where the subtitle will go</h4>
                <img src="/InfoBook.png" id="singleBlogPageImage"/>
                <div className="markdown">
                    <Markdown remarkPlugins={[remarkBreaks]} children={"This is where markdown content will go..  \n **hi**"}/>


                </div>
            </div>
            <div className="pageFooter">
                <div className="pageBoxDivit pageBoxDivitLeft"> </div>
                <div className="pageBoxDivit pageBoxDivitRight"> </div>
            </div>
        
        </div>
    );
}

export default SingularBlogsPage