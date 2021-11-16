import React from 'react';
import {Login, MemberList, SignUp, User, Board, BoardItem, CreateBoard, MainPage} from '../pages'
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
            <Route path="/signup" component={SignUp}/>
            <Route path="/member" component={MemberList}/>
            <Route path="/user" component={User}/>
            <Route path="/board" component={Board}/>
            <Route path="/board-detail/:id" component={BoardItem}/>
            <Route path="/board-create" component={CreateBoard}/>
            <Route path="/main" component={MainPage}/>
        </div>
    );
}

export default App;
