import "../styles/PageStyle.css"
import React from "react"
import { useNavigate } from "react-router-dom"
import "../styles/BlogCard.css"


const BlogCard = ({title, subtitle, images, created_on, author, id, content,views}) => {

    const navigate = useNavigate()

    const handleNavigate = () => {
        let state = {
            title: title,
            subtitle: subtitle,
            images: images,
            id: id,
            created_on: created_on,
            author: author,
            content: content,
            views: views,
        }


        navigate(`${id}/`,{state: state}) // Handle easy naviagation if we navigate from clicking the card. Singular Blog page will check whether it needs to request the newest state...
    }

    return(
        <article className="pageContainer blogCard" onClick={handleNavigate}>
            <div className="pageTitleContainer">
                <h6 className="pageTitle">Blog Post #{id}</h6>
                <div className="pageButtonContainer">
                    <button className="pageButton">_</button>
                    <button className="pageButton">□</button>
                    <button className="pageButton">X</button>
                </div>
            </div>
            <div id="blogCardContent">
            
                <h3 className="blogTitle">{title}</h3>
                <p className="blogTitle">{subtitle}</p>
                <img id="blogCardImage" src={(images && images.length > 0) ? images[0].url : undefined}/>
                <h3 className="blogTitle">Author: {author}</h3>
                <p className="blogTitle">Created On: {new Date(created_on).toString().split(" ").slice(1,4).join(" ")}</p>
            </div>
            <div className="pageFooter">
                <div className="pageBoxDivit pageBoxDivitLeft"> </div>
                <div className="pageBoxDivit pageBoxDivitRight"> </div>
            </div>
        
        </article>
    )
}

export default BlogCard