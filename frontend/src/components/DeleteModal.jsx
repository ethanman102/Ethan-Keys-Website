import React from "react";
import "../styles/Blurb.css"
import "../styles/DeleteModal.css"

const DeleteModal = ({deleteCallback,visibilityCallback,deleting}) => {

    return(
    <div id="modalContainer">
        <div id="deleteContainer">
                <div className="blurbTitleContainer">
                <h6 className="blurbTitle">Delete {deleting}?</h6>
                <div className="blurbButtonContainer">
                <button type="button" className="blurbButton">_</button>
                <button type="button" className="blurbButton">□</button>
                <button  type="button" className="blurbButton">X</button>
                </div>
            </div>
            <p className="blurbMessage">Are you sure you want to delete {deleting}?</p>
            <div id="deleteOptionsContainer">
                <button className="optionButton" type="button" onClick={() => deleteCallback()}>Yes</button>
                <button className="optionButton" type="button" onClick={() => visibilityCallback(false)}>No</button>
            </div>
        </div>
    </div>
    )
}

export default DeleteModal;