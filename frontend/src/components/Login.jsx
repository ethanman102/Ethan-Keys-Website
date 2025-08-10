import Loader from "./Loader"
import { useState } from "react"
import instance from "../../api"
import "../styles/Login.css"

const Login = ({authenticationStateHandler}) => {

    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')

    const handleLogin = (event) => {
        event.preventDefault()
        setLoading(true)
        let formData = new FormData(event.currentTarget)
        instance.post('api/login/',formData).then((response) =>{
            if (response.status === 200){
                setLoading(false)
                authenticationStateHandler(true)
            }
        }).catch((error) =>{
            if (error.response && error.response.status === 404){
                setError('Incorrect Email or Password')
            }
            setLoading(false)
        })
    }

    return(
        <>
        <div className="loginContainer">
            <div className="loginHeader">
                <h5 className="loginTitle">Login</h5>
                <div className="pageButtonContainer">
                    <button className="pageButton">_</button>
                    <button className="pageButton">□</button>
                    <button className="pageButton">X</button>
                </div>
            </div>
            <form id="loginForm" onSubmit={handleLogin}>
                <label htmlFor="emailInput">Email</label>
                <input className="loginInput" id="emailInput" name="email" disabled={loading} type="email"/>
                <label htmlFor="passwordInput">Password</label>
                <input className="loginInput" id="passwordInput" name="password" disabled={loading} type="password"/>
                <div className="loginFooter">
                    <input className="loginButton" type="submit" disabled={loading} value="Login"/>
                    <div className="loginDivit"> {error} </div>
                </div>
            </form>
        </div>
        {loading && 
            <div id="loginLoading">
                <Loader message="Checking"/>
            </div>}
        </>
    )
}

export default Login