import React, { useEffect } from "react";
import "../styles/ImageDisplay.css"
import Paginator from "../components/Paginator";
import { mode } from "../../constants";
import { useState } from "react";

const ImageDisplay = ({images}) => {
    
    const [currentIndex,setCurrentIndex] = useState(0)

    const handlePagination = (jump) => {
        setCurrentIndex(currentIndex + jump)
    }

    useEffect(() =>{

        setCurrentIndex(0)

    },[images])

    return(
        <div>
        <div className="imageDisplayContainer">
            <div className="imageDisplayToolbar">
                <p className="imageDisplayHeader">untitled - Pictures</p>
                <div className="imageDisplayButtons">
                    <button className="idbutton">_</button>
                    <button className="idbutton">□</button>
                    <button className="idbutton">X</button>
                </div>
            </div>
            <div id="imageMenuContainer">
                <p className="imageDisplayMenu"><u>S</u>ome&nbsp;&nbsp; <u>P</u>ictures&nbsp;&nbsp; <u>T</u>o&nbsp;&nbsp; <u>B</u>rowse</p>

            </div>
            <div className="imageDisplayBody">
                <div className="imageDisplayColorBar">
                    <div className="paintSquare" style={{background: 'red'}}> </div>
                    <div className="paintSquare" style={{background: 'orange'}}> </div>
                    <div className="paintSquare" style={{background: 'yellow'}}> </div>
                    <div className="paintSquare" style={{background: 'lime'}}> </div>
                    <div className="paintSquare" style={{background: 'green'}}> </div>
                    <div className="paintSquare" style={{background: 'white'}}> </div>
                    <div className="paintSquare" style={{background: 'black'}}> </div>
                    <div className="paintSquare" style={{background: 'pink'}}> </div>
                    <div className="paintSquare" style={{background: 'purple'}}> </div>
                    <div className="paintSquare" style={{background: 'magenta'}}> </div>
                    <div className="paintSquare" style={{background: 'blue'}}> </div>
                    <div className="paintSquare" style={{background: 'cyan'}}> </div>
                    <div className="paintSquare" style={{background: 'chartreuse'}}> </div>
                    <div className="paintSquare" style={{background: 'teal'}}> </div>
                    <div className="paintSquare" style={{background: 'navajowhite'}}> </div>
                    <div className="paintSquare" style={{background: 'gold'}}> </div>
                    <div className="paintSquare" style={{background: 'gray'}}> </div>
                    <div className="paintSquare" style={{background: 'lightblue'}}> </div>
                </div>
                <img src={( images.length > 0 && images[currentIndex]) ? images[currentIndex].url : undefined} className="imageDisplayContent"/>
            </div>
            <div className="pageFooter">
                <div className="pageBoxDivit pageBoxDivitLeft"> </div>
                <div className="pageBoxDivit pageBoxDivitRight"> </div>
            </div>
        </div>
        <Paginator largest={images.length} smallest={0} current={currentIndex} selectionCallback={handlePagination} itemType="Images"/>
        </div>
    )
}

export default ImageDisplay;