import React from "react"
import "../styles/BottomNav.css"
import Tab from "./Tab"

const BottomNav = ({openTabs}) =>{
    return(
        <div className="bottomNavContainer">
            <div id="menuButtonContainer">
                <img id="menuImage" src="/blog.png"/>
                <button id="menuButton">Contact Me</button>
            </div>
            {openTabs.map((tab) => {return <Tab key={tab.title} title={tab.title} icon={tab.icon}/>})}
        </div>
    )
}

export default BottomNav