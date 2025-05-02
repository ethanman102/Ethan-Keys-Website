import { useState } from 'react'
import './App.css'
import Shortcut from './components/Shortcut'
import BottomNav from './components/BottomNav';
import DesktopManager from './managers/DesktopManager';
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <>
    <BrowserRouter>
      <DesktopManager/>
    </BrowserRouter>
    </>
  )
}

export default App
