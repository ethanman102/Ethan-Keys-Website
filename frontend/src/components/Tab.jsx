import React, {useContext} from "react"
import { TabContext } from "../managers/DesktopManager"
import "../styles/Tab.css"
import { useNavigate } from "react-router-dom"

// Tab:
// Main Purpose -> To display at the bottom of the BottomNav when a shortcut is clicked from the Desktop
// Effects -> Show on Click of a Shortcut, Order most recent to oldest, Remove self from Bottom Nav when Close button is clicked
const Tab = ({title,icon,path}) => {

    const closeTabCallback = useContext(TabContext); // Context provided from DesktopManager
    const navigate = useNavigate();

    // Onclick function to relay to the desktopmanager that the tab needs to be removed from the bottomnav
    const onCloseClick = () => {

        let tabObject = {
            title: title,
            icon: icon
        }

        closeTabCallback(tabObject);

    }

    const onTabClick = () => {
        navigate(path);
    }

    return (
        <div className="tabContainer" onClick={onTabClick}>
            <img className="tabImage" src={icon}/>
            <p className="tabTitle">{title}</p>
            <button className="closeTabButton" onClick={(e) => {
                e.stopPropagation();
                onCloseClick();}
                }>X</button>
        </div>
    )
}


export default Tab;
