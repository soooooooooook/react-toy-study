import React from "react";

const SignUp = () => {
    const joinForm = document.getElementById('joinForm');

    joinForm.addEventListener('submit', function (e) {
        e.preventDefault();

        let email = document.getElementById('email').value;
        let name = document.getElementById('name').value;
        let password = document.getElementById('password').value;

        const url = 'https://jssampletest.herokuapp.com/api/auth/signup';
        let data = { email: email, name: name, password: password };
        console.log(data);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.text())
            .then((response) => console.log(response));
    });

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
