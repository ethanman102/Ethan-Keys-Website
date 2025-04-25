import React, {useState} from "react"
import "../styles/Shortcut.css"
import Blurb from "./Blurb"


const Shortcut = ({title,icon,description,onShortcutClick}) => {

    const [showBlurb, setShowBlurb] = useState(false);

    const handleShortcutClick = () => {
        let shortcutObject = {
            title : title,
            icon : icon
        };

        onShortcutClick(shortcutObject);
    }

    return (
        <>
        <div className="shortcutContainer" 
            onClick={() => handleShortcutClick()}
            onMouseEnter={() => setShowBlurb(true)} 
            onMouseLeave={() => setShowBlurb(false)}>
            <img className="shortcutImage" src={icon} />
            <h5 className="shortcutTitle">{title}</h5>
        </div>
        {showBlurb && <Blurb title={title} message={description}/>}
        </>
    );
}

export default Shortcut