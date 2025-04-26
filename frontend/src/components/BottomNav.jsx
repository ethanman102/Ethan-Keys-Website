import React, {useState} from "react"
import "../styles/BottomNav.css"
import Tab from "./Tab"
import EmailPopup from "./EmailPopup"

const BottomNav = ({openTabs}) =>{

    // Popup Menu for the users to send me and email and etc.
    const [showPopup,setShowPopup] = useState(false);

    return(
        <div className="bottomNavContainer">
            <div id="menuButtonContainer" onClick={() => setShowPopup(!showPopup)}>
                <img id="menuImage" src="/blog.png"/>
                <button id="menuButton">Contact Me</button>
            </div>
            {showPopup && <EmailPopup/>}
            {openTabs.map((tab) => {return <Tab key={tab.title} title={tab.title} icon={tab.icon}/>})}
        </div>
    )
}

export default BottomNav