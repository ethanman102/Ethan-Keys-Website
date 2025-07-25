import "../styles/PageStyle.css"
import React from "react"
import { useNavigate } from "react-router-dom"
import "../styles/BlogCard.css"
import Blurb from "./Blurb"


const BlogCard = ({title, subtitle, image, date, author, id}) => {

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(`${id}/`)
    }

    return(
        <article className="pageContainer" onClick={handleNavigate}>
            <div className="pageTitleContainer">
                <h6 className="pageTitle">Blog Post #{id}</h6>
                <div className="pageButtonContainer">
                    <button className="pageButton">_</button>
                    <button className="pageButton">□</button>
                    <button className="pageButton">X</button>
                </div>
            </div>
            <div id="blogCardContent">
            
                <h3 className="blogTitle">This is where the title goes {title}</h3>
                <p className="blogTitle">Subtitle goes here: {subtitle}</p>
                <img id="blogCardImage" src='/blog.png'/>
            </div>
            <Blurb message={`Created On: ${new Date(date).toString().split(" ").slice(1,4).join(" ")}`} title={`Posted By: ${author}`}/>
            <div className="pageFooter">
                <div className="pageBoxDivit pageBoxDivitLeft"> </div>
                <div className="pageBoxDivit pageBoxDivitRight"> </div>
            </div>
        
        </article>
    )
}

export default BlogCard