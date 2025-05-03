import { useState, createContext} from 'react';
import React from "react";
import { useNavigate } from 'react-router-dom';
import Shortcut from '../components/Shortcut';
import BottomNav from '../components/BottomNav';
import HomePage from '../pages/HomePage';
import GamesPage from '../pages/GamesPage';
import BlogPage from '../pages/BlogPage';
import ProjectsPage from '../pages/ProjectsPage';

import { Route, Routes } from "react-router-dom";

export const TabContext = createContext();

const DesktopManager = () =>{

    const [openTabs,setOpenTabs] = useState([]);
    let navigate = useNavigate();

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

        // When we close a tab we should simply need to navigate to the first tab if one exists
        let toNavigateTo = '/';
        // If we have no tabs after closing then we should simply navigate to the home tab 
        if (newTabs.length > 0 && newTabs.at(0).title.toLowerCase() !== 'home'){
            toNavigateTo = toNavigateTo + `${newTabs.at(0).title.toLowerCase()}/`;
        }
        navigate(toNavigateTo);
        
    }

    return(
        <>
        
        <Shortcut title="Home" icon="none" description="Navigate back to the sites home to see the basics of me." path='/' onShortcutClick={onShortcutClicked}/>
        <Shortcut title="Projects" icon="none" description="Learn about the cool projects I have worked on!" path='/projects/' onShortcutClick={onShortcutClicked}/>
        <Shortcut title="Blog" icon="/blog.png" description="See my blog posts relating to my current interests and hobbies!" path='/blog/' onShortcutClick={onShortcutClicked}/>
        <Shortcut title="Games" icon="none" description="Play a game or two for some short time fun!" path='/games/' onShortcutClick={onShortcutClicked}/>

        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/blog/' element={<BlogPage/>}/>
            <Route path='/games/' element={<GamesPage/>}/>
            <Route path='/projects/' element={<ProjectsPage/>}/>
        </Routes>

        {/* Wrap in the context provider to allow tabs to communicate to manager when the X button closes tab. */}
        <TabContext.Provider value={onShortcutClosed}>
            <BottomNav openTabs={openTabs}/> 
        </TabContext.Provider>
        
        </>
    )
}

export default DesktopManager;