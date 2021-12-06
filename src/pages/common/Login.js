import React, {useState} from 'react';
import "../../styles/login.css"
import {useDispatch} from 'react-redux';
import {login} from '../../features/userSlice';
import jwtDecode from "jwt-decode";
import * as authApi from "../../service/auth"

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();

        const ex401 = '자격 증명에 실패하였습니다.';

        authApi.login(email, password)
            .then(response => {
                const result = response.data;
                if (result.data === ex401) return setError(true);
                if (result.data.accessToken) {
                    console.log('데이터를 알려줘', result.data);
                    const info = jwtDecode(result.data.accessToken);
                    localStorage.setItem('token', JSON.stringify({...result.data, ...info}));
                    dispatch(
                        login({
                            token: result.data.accessToken,
                            loggedIn: true,
                        })
                    );
                    props.history.push('/board');

                }
            })
    }

    const goLogoutPage = () => {
        props.history.push('/signup');
    }

    return (
        <div className="login_page">
            <div className="login_wrapper">
                <h1 className="logo mb-40">Toy Project</h1>
                <form className="login" onSubmit={(e) => handleSubmit(e)}>
                    <input type="email"
                           placeholder="Email"
                           value={email}
                           className="input_form mb-10"
                           onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password"
                           placeholder="Password"
                           value={password}
                           className="input_form mb-20"
                           onChange={(e) => setPassword(e.target.value)}/>
                    {
                        error ? <p className="error_message">아이디와 비밀번호를 확인하세요.</p> : null
                    }
                    <button type="submit"
                            className="button dark w-100 mb-10">login
                    </button>
                    <button className="button line dark w-100" onClick={goLogoutPage}>Sign up</button>
                </form>
            </div>
        </div>
    )
}

export default Login;
