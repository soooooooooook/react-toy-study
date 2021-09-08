import React from "react";

const SignUp = () => {
    return(
        <div>
            <h1>sign up</h1>
            <form Id="joinForm">
                <label htmlFor="email">email</label>
                <input type="text" id="email"/>
                    <label htmlFor="name">name</label>
                    <input type="text" id="name"/>
                    <label htmlFor="password">password</label>
                    <input type="password" id="password"/>
                    <button type="submit">sign up</button>
            </form>
        </div>
    )
}

export default SignUp;
