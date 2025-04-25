import { useState, createContext} from 'react'
import React from "react"
import Shortcut from '../components/Shortcut'
import BottomNav from '../components/BottomNav';

export const TabContext = createContext();

const DesktopManager = () =>{

    const [openTabs,setOpenTabs] = useState([]);

    // Utilized as a callback function to add a new tab to the front of the opened shortcuts (regardless if opened on not already)
    const onShortcutClicked = (shortcutObject) => {
        let alreadyOpened = openTabs.some( (shortcut) => {return shortcut.title === shortcutObject.title});

        if (alreadyOpened){
            // case where the shortcut is already opened so we need to move it to the front.
            let filteredTabs = openTabs.filter((tab) => {return tab.title !== shortcutObject.title})
            setOpenTabs([shortcutObject, ...filteredTabs]);
        }
        else setOpenTabs([shortcutObject, ...openTabs]);
    }

    // Utilized as a callback function to modify the state of the desktop tabs based on whether a tab was closed
    const onShortcutClosed = (tabObject) => {
        // can simply find by the title...
        let newTabs = openTabs.filter((tab) => {return tab.title !== tabObject.title});
        setOpenTabs(newTabs);
    }

    return(
        <>
        
        <Shortcut title="Home" icon="none" onShortcutClick={onShortcutClicked}/>
        <Shortcut title="Projects" icon="none" onShortcutClick={onShortcutClicked}/>
        <Shortcut title="Blog" icon="/blog.png" onShortcutClick={onShortcutClicked}/>
        <Shortcut title="Games" icon="none" onShortcutClick={onShortcutClicked}/>

        {/* Wrap in the context provider to allow tabs to communicate to manager when the X button closes tab. */}
        <TabContext.Provider value={onShortcutClosed}>
            <BottomNav openTabs={openTabs}/> 
        </TabContext.Provider>
        
        </>
    )
}

export default DesktopManager;