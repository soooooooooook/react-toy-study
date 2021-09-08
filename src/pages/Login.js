import React from "react";

const Login = () => {
    return(
        <div>
            <h1>Login</h1>
            <form Id="loginForm">
                <label htmlFor="email">email</label>
                <input type="text" id="email"/>
                    <label htmlFor="password">password</label>
                    <input type="password" id="password"/>
                    <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login;
