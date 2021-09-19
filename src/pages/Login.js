import React from 'react';
import axios from 'axios';
import url from '../utils/url';

const Login = () => {
    const ex401 = '자격 증명에 실패하였습니다.';

    const login = (e) => {
        e.preventDefault();
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let data = {email: email, password: password};

        axios.post(url+'login', data)
            .then(response => {
                const result = response.data;
                if(result.data === ex401) return;
                if(result.data.accessToken) localStorage.setItem('accessToken', result.data.accessToken);
            })
            .catch(response => { console.log(response) });
    }

    return (
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
