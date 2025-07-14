const Login = () => {
    return(
        <div className="loginContainer">
            <div className="loginHeader">
                <h5 className="loginTitle">Login</h5>
                <div className="pageButtonContainer">
                    <button className="pageButton">_</button>
                    <button className="pageButton">□</button>
                    <button className="pageButton">X</button>
                </div>
            </div>
            <form id="loginForm">
                <label for="emailInput">Email</label>
                <input className="loginInput" id="emailInput" name="email" type="email"/>
                <label for="passwordInput">Password</label>
                <input className="loginInput" id="passwordInput" name="password" type="password"/>
                <div className="loginFooter">
                    <input className="loginButton" type="submit" value="Login"/>
                    <div className="loginDivit"> </div>
                </div>
            </form>
        </div>
    )
}