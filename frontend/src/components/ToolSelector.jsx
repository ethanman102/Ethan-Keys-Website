import "../styles/PageStyle.css"
import "../styles/ToolSelector.css"
import "../styles/CustomScrollbar.css"
import { useState,useEffect } from "react"
import Tool from "./Tool"

const ToolSelector =  () => {

    const [tools,setTools] = useState([])
    const [selected,setSelected] = useState([])

    const handleSelect = (tool) => {
        let toolName = tool.getAttribute('name')

        if (selected.some((toolItem) => toolItem === toolName)) setSelected(selected.filter((toolItem)=> toolItem !== toolName));
        else setSelected([...selected,toolName]);
    }

    return(
        <div className="pageContainer toolSelectorContainer">
            <div className="pageTitleContainer">
                <h6 className="pageTitle">Tools</h6>
                <div className="pageButtonContainer">
                    <button className="pageButton">_</button>
                    <button className="pageButton">□</button>
                    <button className="pageButton">X</button>
                </div>
            </div>
            <div className="dropDownProjectsTabs">
                <p className="dropdownTab"><u>Y</u>our</p>
                <p className="dropdownTab"><u>T</u>ools</p>
            </div>
            <div className="toolList basicScrollbar">
                {tools.map((tool,i)=>{
                    return(
                        <div key={i} name={i} className="toolSelectContainer" style={{backgroundColor: selected.some((selectedTool) => tool.name === selectedTool) ? "#118ee249" : ""}}
                            onClick={(event) => handleSelect(event.currentTarget) }>
                            <Tool/>
                        </div>
                    )
                })}


            </div>
            <div className="pageFooter">
                <div className="pageBoxDivit pageBoxDivitLeft"> </div>
                <div className="pageBoxDivit pageBoxDivitRight"> </div>
            </div>
        
        </div>
    )
}

export default ToolSelector;