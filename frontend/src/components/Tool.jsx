import Blurb from "./Blurb"
import React from "react"
import { useState } from "react"
import "../styles/Tool.css"
import { toolTypes } from "../../constants"

const Tool = ({icon,name,type}) => {

    const [showBlurb,setShowBlurb] = useState(false)

    let message
    switch (type){
        case toolTypes.FRONTEND:
            message = "Utilized to build the frontend"
            break
        case toolTypes.BACKEND:
            message = "Utilized to build the backend"
            break
    }


    return(
        <div className="toolContainer"
            onMouseEnter={() => setShowBlurb(true)} 
            onMouseLeave={() => setShowBlurb(false)}>
            <img className="toolIcon" src={icon}/>
        </div>
    )
}
export default Tool