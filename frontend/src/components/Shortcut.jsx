import React from "react"
import "../styles/Shortcut.css"

const Shortcut = ({title,icon,onShortcutClick}) => {

    const handleShortcutClick = () => {
        let shortcutObject = {
            title : title,
            icon : icon
        };

        onShortcutClick(shortcutObject);
    }

    return (
        <div className="shortcutContainer" onClick={() => handleShortcutClick()}>
            <img className="shortcutImage" src={icon} />
            <h5 className="shortcutTitle">{title}</h5>
        </div>
    );
}

export default Shortcut