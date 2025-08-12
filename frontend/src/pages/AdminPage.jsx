import "../styles/PageStyle.css"
import "../styles/ProjectCreation.css"
import "../styles/AdminPage.css"
import "../styles/ToolSelector.css"
import "../styles/CustomScrollbar.css"
import { useState,useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import instance from "../../api"
import Login from "../components/Login"
import Loader from "../components/Loader"

const AdminPage = () =>{

    const navigate = useNavigate()
    const [authenticated,setAuthenticated] = useState(false)
    const [loading,setLoading] = useState(false);

    // check if the user is logged in or NOT
    useEffect(() => {
        setLoading(true)
        instance.get(`api/authenticated/`).then((response) =>{
            if (response.status === 200) setAuthenticated(true);
            //else setAuthenticated(false);
            setLoading(false);
        }).catch((error) => {
            //setAuthenticated(false)
            setLoading(false)
        })
    },[])

    return(
        <>
        {loading ? 
        <div id="adminLoading">
        <Loader message="Loading"/>
        </div> :
        authenticated ? 

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
                <p className="dropdownTab adminTopTab" onClick={()=>navigate("blog/")}><u>B</u>logs</p>
                <p className="dropdownTab adminTopTab" onClick={()=>navigate("tool/")}><u>T</u>ools</p>
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
        : <Login authenticationStateHandler={setAuthenticated}/> } 
        
        </>
    )
}
export default AdminPage