import React from "react";

const Login = () => {
    const ex401 = '자격 증명에 실패하였습니다.';
    const url = 'https://jssampletest.herokuapp.com/api/auth/login';

    function fetchPost(data) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }

    function login(e) {
        e.preventDefault();
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        let data = { email: email, password: password };
        // console.log(data);

        fetchPost(data)
            .then(async (response) => {
                const result = await response.json();
                console.log("data", result.data);
                if (result.data === ex401) return;
                if (result.data.accessToken) localStorage.setItem('accessToken', result.data.accessToken);
                // location.href = 'memberControl.html';
            })
            .catch((e) => {});

    }

    return(
        <div>
            <h1>Login</h1>
            <form id="loginForm">
                <label htmlFor="email">email</label>
                <input type="text" id="email"/>
                    <label htmlFor="password">password</label>
                    <input type="password" id="password"/>
                    <button type="submit" onClick={login}>login</button>
            </form>
        </div>
    )
}

export default Login;
