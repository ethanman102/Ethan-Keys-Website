import React, {useState} from "react"
import "../styles/EmailPopup.css"
import axios from "axios";
import Loader from "./Loader";
import { apiURL } from "../../constants";
import Cookies from "js-cookie";

const EmailPopup = ({closeCallback}) => {

    const [characterCount, setCharacterCount] = useState(0);
    const [loading,setLoading] = useState(false)
    const [sent,setSent] = useState(false)
    const [error, setError] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
    
        let formData = new FormData(event.target)
        let obj = Object.fromEntries(formData)
        
        if (obj.name === null || obj.name === "" || obj.email === null || obj.email === ""){
            setLoading(false)
            setError(true)
            return
        }

        let json = JSON.stringify(obj)

        let response = await axios.post(
            `${apiURL}/api/email/`,
            json,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": Cookies.get("csrftoken"),
                },
            }
        );

        if (response.status === 200){
            setSent(true)
            setLoading(false)
            setError(false)
        }else{
            setLoading(false)
            setError(true)
        }


    }

    return(
        <div className="emailContainer">
            <div className="emailHeaderContainer">
            <h5 className="emailHeader">Email Me</h5>
            <div className="emailButtonContainer">
                <button className="emailButton" onClick={e => closeCallback(false)}>_</button>
                <button className="emailButton" onClick={e => closeCallback(false)}>□</button>
                <button className="emailButton" onClick={e => closeCallback(false)}>X</button>
            </div>
        </div>
        <form onSubmit={handleSubmit} id="emailForm">
            <input className="inputBox" placeholder="Your Name" type="text" name="name" disabled={loading}/>
            <input className="inputBox" placeholder="Your Email" type="email" name="email" disabled={loading}/>
            <textarea placeholder="Message" className="inputBox inputMessage" name="message" onChange={e => setCharacterCount(e.target.value.length)} disabled={loading}/>
            {loading &&
            <div id="loadingContainer">
                <Loader message="Sending"/>
            </div>}
            {sent && <p id="emailSuccess">Message has been sent!</p>}
            {error && <p id="emailError">Error: Ensure email and name not blank!</p>}
            <div className="emailBoxFooter">
            <div className="emailBoxDivit">{characterCount}/1000</div>
            <input type="submit" className="emailSendButton" value="Send" disabled={loading}/>
            </div>
        </form>
        </div>
    )
}

export default EmailPopup;