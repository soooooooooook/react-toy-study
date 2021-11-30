import React, {useState} from "react";
import axios from "axios";
import baseUrl from "../../enum/url";
import "../../styles/login.css"
// import {useHistory} from "react-router-dom";

const SignUp = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [zipcode, setZipcode] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        let data = {name: name, email: email, password: password, city: city, street: street, zipcode: zipcode};

        axios.post(baseUrl + 'auth/signup', data)
            .then(response => {
                props.history.push('/');
            })
            .catch(reason => {
                console.log(reason);
            })
    }

    return(
        <div className="login_page">
            <div className="login_wrapper">
                <h1 className="title">Sign up</h1>
                <form  className="login" onSubmit={(e) => handleSubmit(e)}>
                    <input type="email"
                           placeholder="email"
                           value={email}
                           className="input_form"
                           onChange={(e) => setEmail(e.target.value)}/>
                    <input type="name"
                           placeholder="name"
                           value={name}
                           className="input_form"
                           onChange={(e) => setName(e.target.value)}/>
                    <input type="password"
                           placeholder="password"
                           value={password}
                           className="input_form"
                           onChange={(e) => setPassword(e.target.value)}/>
                    <input type="text"
                           placeholder="city"
                           value={city}
                           className="input_form"
                           onChange={(e) => setCity(e.target.value)}/>
                    <input type="text"
                           placeholder="street"
                           value={street}
                           className="input_form"
                           onChange={(e) => setStreet(e.target.value)}/>
                    <input type="text"
                           placeholder="zipcode"
                           value={zipcode}
                           className="input_form"
                           onChange={(e) => setZipcode(e.target.value)}/>
                    <button type="submit"
                            className="login_button">sign up</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;
