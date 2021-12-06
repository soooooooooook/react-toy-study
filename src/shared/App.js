import React from 'react';
import {MemberList, User, Board, BoardItem, CreateBoard, Login, SignUp} from '../pages'
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
        <div className="body-layout">
            <Route exact path="/" component={Login}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/member" component={MemberList}/>
            <Route path="/user" component={User}/>
            <Route path="/board" component={Board}/>
            <Route exact path="/detail/:id" component={BoardItem}/>
            <Route path="/create" component={CreateBoard}/>
        </div>
    );
}

export default App;
