import "../styles/PageStyle.css"
import "../styles/ToolSelector.css"
import "../styles/CustomScrollbar.css"
import { useState,useEffect } from "react"
import Tool from "./Tool"
import instance from "../../api"

const ToolSelector =  ({currentTools,selectRef}) => {

    const [tools,setTools] = useState([])
    const [selected,setSelected] = useState(currentTools)

    const handleSelect = (tool) => {
        let toolName = tool.getAttribute('name')
        

        if (selected.some((toolItem) => toolItem.name == toolName)) {
            let updated = selected.filter((toolItem) => toolItem.name != toolName)
            setSelected(updated)
            selectRef.current = updated
        } else {
            let toAdd = tools.find(t => toolName == t.name)
            let updated = [...selected, toAdd]
            setSelected(updated)
            selectRef.current = updated
        }
    }

    useEffect(() => {
        instance.get('api/tools/').then((response) => {
            setTools(response.data.tools)
            return response
        })
    },[])

    useEffect(() => {
        setSelected(currentTools)
        selectRef.current = currentTools
    },[currentTools])

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
                        <div key={i} name={tool.name} className="toolSelectContainer" style={{outline: selected.some((selectedTool) => tool.id == selectedTool.id) ? "#118ee249 3px solid" : ""}}
                            onClick={(event) => handleSelect(event.currentTarget) }>
                            <Tool icon={tool.image.url} name={tool.name} type={tool.type}/>
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