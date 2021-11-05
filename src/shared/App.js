import React from 'react';
import {Login, MemberList, SignUp, User} from '../pages'
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
            <Route exact path="/" component={Login}/>
            {/*<Route exact path="/home" component={ Home }></Route>*/}
            <Route path="/signup" component={SignUp}/>
            <Route path="/member" component={MemberList}/>
            <Route path="/user" component={User}/>
        </div>
    );
}

export default App;
