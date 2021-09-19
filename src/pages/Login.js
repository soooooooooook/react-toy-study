import React, { useState } from 'react';
import axios from 'axios';
import url from '../utils/url';
import "../styles/login.css"
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(
            login({
                email: email,
                password: password,
                loggedIn: true,
            })
        );

        // const ex401 = '자격 증명에 실패하였습니다.';
        // let data = {email: email, password: password};
        //
        // axios.post(url+'login', data)
        //     .then(response => {
        //         const result = response.data;
        //         if(result.data === ex401) return;
        //         if(result.data.accessToken) localStorage.setItem('accessToken', result.data.accessToken);
        //     })
        //     .catch(response => { console.log(response) });
    }

    return (
            <div className="login_wrapper">
                <h1 className="title">Login</h1>
                <form className="login" onSubmit={(e) => handleSubmit(e)}>
                    <input type="email"
                           placeholder="Email"
                           value={email}
                           className="input_form"
                           onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password"
                           placeholder="Password"
                           value={password}
                           className="input_form"
                           onChange={(e) => setPassword(e.target.value)}/>
                    <button type="submit"
                            className="login_button">login</button>
                </form>
            </div>
        )
    }

export default Login;
