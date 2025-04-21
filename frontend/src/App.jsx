import { useState } from 'react'
import './App.css'
import Shortcut from './components/Shortcut'
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
    <Shortcut title="Home" icon="none"/>
    <Shortcut title="Projects" icon="none"/>
    <Shortcut title="Blog" icon="/blog.png"/>
    <Shortcut title="Games" icon="none"/>
    </>
  )
}

export default App
