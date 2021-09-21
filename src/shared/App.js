import React, { Component } from 'react';
import {Login, MemberControl, SignUp} from '../pages'
import {Route} from "react-router-dom";
import {login} from "../features/userSlice";
import {useDispatch} from "react-redux";

const App = () => {
    const dispatch = useDispatch();

    if(localStorage.getItem('token')) {
        dispatch(
            login({
                token: localStorage.getItem('token'),
                loggedIn: true,
            })
        );
    }
    return (
        <div>
            {/*<Login></Login>*/}
            {/*<Route exact path="/" component={ Home }></Route>*/}
            <Route path="/login" component={ Login }></Route>
            <Route path="/signup" component={ SignUp }></Route>
            <Route path="/member" component={ MemberControl }></Route>
        </div>
    );
}

export default App;
