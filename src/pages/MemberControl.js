import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useHistory} from "react-router-dom";
import axios from "axios";
import baseUrl from "../enum/url";
import User from "./User";
import {logout} from "../features/userSlice";

const MemberControl = () => {
    useEffect(() => {
        if (users.length === 0) {
            getUserList();
        }
        return () => {

        }
    });
    const dispatch = useDispatch();
    const history = useHistory();

    const [users, setUsers] = useState([]);
    const {user} = useSelector(state => state.user);

    if (!user?.loggedIn) {
        return <Redirect to="/login"/>;
    }


    const getUserList = () => {
        axios.get(baseUrl + 'member/all')
            .then(res => {
                return setUsers(res.data.data);
            })
            .catch(console.log);
    }
    const onClickLogout = () => {
        dispatch(
            logout()
        );
        history.push('/login');
    }

    return (
        <div>
            <h1>member</h1>
            <div>{user.token}</div>
            <button id="allButton">All</button>
            {users.map(user => (
                <User user={user} key={user.seq}/>
            ))}
            <div>
                <label htmlFor="email">email</label>
                <input type="text" id="email"/>
                <button id="oneButton">search</button>
            </div>
            <button onClick={onClickLogout}>logout</button>
            <ul className="data"></ul>
        </div>
    )
}

export default MemberControl;
