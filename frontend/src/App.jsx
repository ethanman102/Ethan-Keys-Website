import { useState ,useEffect} from 'react'
import './App.css'
import Shortcut from './components/Shortcut'
import BottomNav from './components/BottomNav';
import DesktopManager from './managers/DesktopManager';
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';

function App() {

  // asked chatgpt why vh is different for safari and chrome mobile. it suggested setting the innterheight of the screen to be the vh var
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };

    // Set initially
    setVh();

    // Update on resize
    window.addEventListener("resize", setVh);
    window.addEventListener("orientationchange", () => {
    // asked chatgpt why my oritentation changes makes the vh var smaller!
      setTimeout(setVh, 200);
    });
    // asked chatgpt to fix the mobile chjrome error
    window.visualViewport?.addEventListener("resize", setVh);

    // Cleanup
    return () =>{
      window.removeEventListener("resize", setVh);  
      window.removeEventListener("orientationchange", setVh);
      window.visualViewport?.removeEventListener("resize", setVh);
    }
  }, []);

  return (
    <>
    <BrowserRouter>
      <DesktopManager/>
    </BrowserRouter>
    </>
  )
}

export default App
