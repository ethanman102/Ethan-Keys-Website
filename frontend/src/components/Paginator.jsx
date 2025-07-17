import React, { useEffect, useState } from "react"
import "../styles/Paginator.css"

const Paginator = ({smallest,largest,current,selectionCallback}) => {


    return(
        <div className="paginatorContainer">
            <p className="paginatorTitle">Paginate</p>
            <div className="arrowContainer">
                <button className="paginatorButton" disabled={current===smallest} onClick={()=>selectionCallback(-1)}>🢀</button>
                <button className="paginatorButton paginatorButtonRight" disabled={current + 1 ===largest || largest === 0} onClick={()=>selectionCallback(1)}>🢂</button>
            </div>
            <div className="paginatorDivitContainer">
                <div className="paginatorDivit">{largest === 0 ? "" : `${current+1}/${largest}`}</div>
                <div className="paginatorDivit"></div>
                <div className="paginatorDivit">Images</div>
            </div>
        </div>
    )
}

export default Paginator;