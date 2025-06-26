import React from "react"
import "../styles/Paginator.css"

const Paginator = ({smallest,largest,selectionCallback}) => {

    return(
        <div className="paginatorContainer">
            <div className="arrowContainer">
                <button className="paginatorButton">🢀</button>
                <div className="paginatorMiddle"> </div>
                <button className="paginatorButton">🢂</button>
            </div>
            <div className="paginatorDivitContainer">
                <div className="paginatorDivit">1/5</div>
                <div className="paginatorDivit"></div>
                <div className="paginatorDivit">Images</div>
            </div>
        </div>
    )
}

export default Paginator;