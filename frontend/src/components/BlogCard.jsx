import "../styles/PageStyle.css"
import React from "react"
import { useNavigate } from "react-router-dom"
import "../styles/BlogCard.css"


const BlogCard = ({title, subtitle, image, date, author, id, content,views}) => {

    const navigate = useNavigate()

    const handleNavigate = () => {
        let state = {
            title: title,
            subtitle: subtitle,
            image: image,
            id: id,
            date: date,
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
            
                <h3 className="blogTitle">This is where the title goes {title}</h3>
                <p className="blogTitle">Subtitle goes here: {subtitle}</p>
                <img id="blogCardImage" src='/blog.png'/>
                <h3 className="blogTitle">Author:</h3>
                <p className="blogTitle">Created On: </p>
            </div>
            <div className="pageFooter">
                <div className="pageBoxDivit pageBoxDivitLeft"> </div>
                <div className="pageBoxDivit pageBoxDivitRight"> </div>
            </div>
        
        </article>
    )
}

export default BlogCard