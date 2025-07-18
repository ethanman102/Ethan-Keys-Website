import "../styles/PageStyle.css"
import "../styles/ProjectCreation.css"
import "../styles/AdminPage.css"
import "../styles/ToolSelector.css"
import "../styles/CustomScrollbar.css"
import { useState,useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const AdminPage = () =>{

    const navigate = useNavigate()

    

    return(
        <>


        <div className="pageContainer">
            <div className="pageTitleContainer">
                <h6 className="pageTitle">Admin</h6>
                <div className="pageButtonContainer">
                    <button className="pageButton">_</button>
                    <button className="pageButton">□</button>
                    <button className="pageButton">X</button>
                </div>
            </div>
            <div className="dropDownProjectsTabs">
                <p className="dropdownTab adminTopTab" onClick={()=>navigate("project/")}><u>P</u>rojects</p>
                <p className="dropdownTab adminTopTab"><u>B</u>logs</p>
                <p className="dropdownTab adminTopTab"><u>T</u>ools</p>
            </div>
            {(window.location.pathname.toLowerCase() === '/admin/') && 
            <div className="adminWelcomeContainer">
                <h3>Welcome to the Admin Page Mr. Keys :D</h3>
                <p>Use the tabs above to navigate to your admin decision</p>
            </div>}
            <Outlet/>
            <div className="pageFooter">
                <div className="pageBoxDivit pageBoxDivitLeft"> </div>
                <div className="pageBoxDivit pageBoxDivitRight"> </div>
            </div>
        
        </div>
        
        </>
    )
}
export default AdminPage