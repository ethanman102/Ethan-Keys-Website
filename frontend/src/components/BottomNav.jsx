import React from "react"
import "../styles/BottomNav.css"

const BottomNav = () =>{
    return(
        <div className="bottomNavContainer">
            <div id="menuButtonContainer">
                <img id="menuImage" src="/blog.png"/>
                <button id="menuButton">Hi</button>
            </div>
        </div>
    )
}

export default BottomNav