import React, {useState} from 'react';
import "../styles/login.css"
import {useDispatch} from 'react-redux';
import {login} from '../features/userSlice';
import axios from "axios";
import baseUrl from "../enum/url";
import jwtDecode from "jwt-decode";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();

        const ex401 = '자격 증명에 실패하였습니다.';
        let data = {email: email, password: password};

        axios.post(baseUrl + 'auth/login', data)
            .then(response => {
                const result = response.data;
                console.log('사용자 정보',result.data);
                if (result.data === ex401) return;
                if (result.data.accessToken) {
                    const info = jwtDecode(result.data.accessToken);
                    dispatch(
                        login({
                            token: result.data.accessToken,
                            loggedIn: true,
                        })
                    );
                    localStorage.setItem( 'token' , JSON.stringify({...result.data, ...info}));
                    props.history.push('/member');
                }
            })
            .catch(response => {
                console.log(response)
            });
    }

    const goLogoutPage = () => {
        props.history.push('/signup');
    }

    return (
        <div className="login_page">
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
                            className="login_button">login
                    </button>
                </form>
                <span className="signup_button" onClick={goLogoutPage}>Sign up</span>
            </div>
        </div>
    )
}

export default Login;
