import { useState ,useEffect} from 'react'
import './App.css'
import Shortcut from './components/Shortcut'
import BottomNav from './components/BottomNav';
import DesktopManager from './managers/DesktopManager';
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';

function App() {
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

    // Cleanup
    return () => window.removeEventListener("resize", setVh);
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
