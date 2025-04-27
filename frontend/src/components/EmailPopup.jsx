import React, {useState} from "react"
import "../styles/EmailPopup.css"

const EmailPopup = () => {

    const [characterCount, setCharacterCount] = useState(0);

    return(
        <div className="emailContainer">
            <div className="emailHeaderContainer">
            <h5 className="emailHeader">Email Me</h5>
            <div className="emailButtonContainer">
                <button className="emailButton">_</button>
                <button className="emailButton">□</button>
                <button className="emailButton">X</button>
            </div>
        </div>
            <input className="inputBox" placeholder="Your Name" type="text"/>
            <input className="inputBox" placeholder="Your Email" type="email"/>
            <textarea placeholder="Message" className="inputBox inputMessage" onChange={e => setCharacterCount(e.target.value.length)}/>
            <div className="emailBoxFooter">
            <div className="emailBoxDivit">{characterCount}/1000</div>
            <button className="emailSendButton">Send</button>
            </div>
        </div>
    )
}

export default EmailPopup;