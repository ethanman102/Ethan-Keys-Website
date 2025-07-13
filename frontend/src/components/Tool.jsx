import Blurb from "./Blurb"
import React from "react"
import { useState } from "react"
import "../styles/Tool.css"

const Tool = ({icon,name,type,description}) => {

    const [showBlurb,setShowBlurb] = useState(false)


    return(
        <div className="toolContainer"
            onMouseEnter={() => setShowBlurb(true)} 
            onMouseLeave={() => setShowBlurb(false)}>
            <img className="toolIcon" src="/blog.png"/>
            {showBlurb && <Blurb title={name} message={description}/>}
        </div>
    )
}
export default Tool