import React, {useState} from "react"
import "../styles/BottomNav.css"
import Tab from "./Tab"
import EmailPopup from "./EmailPopup"
import email from '../assets/email.png'

const BottomNav = ({openTabs}) =>{

    // Popup Menu for the users to send me and email and etc.
    const [showPopup,setShowPopup] = useState(false);

    return(
        <div className="bottomNavContainer">
            <div id="menuButtonContainer" onClick={() => setShowPopup(!showPopup)}>
                <img id="menuImage" src={email}/>
                <button id="menuButton">Contact Me</button>
            </div>
            {showPopup && <EmailPopup closeCallback={setShowPopup}/>}
            {openTabs.map((tab) => {return <Tab key={tab.title} title={tab.title} icon={tab.icon} path={tab.title.toLowerCase() == 'home' ? '/' : `/${tab.title.toLowerCase()}/`}/>})}
        </div>
    )
}

export default BottomNav