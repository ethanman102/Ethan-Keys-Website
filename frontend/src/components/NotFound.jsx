import React from "react";
import "../styles/PageStyle.css"
import "../styles/NotFound.css"

const NotFound = () => {
    return(
                <div className="pageContainer notFoundContainer">
            <div className="pageTitleContainer">
                <h6 className="pageTitle">404 - Not Found</h6>
                <div className="pageButtonContainer">
                    <button className="pageButton">_</button>
                    <button className="pageButton">□</button>
                    <button className="pageButton">X</button>
                </div>
            </div>
            <p id="notFoundMessage">Sorry... this page couldn't be found</p>
        </div>
    )
}

export default NotFound