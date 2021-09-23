import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import axios from "axios";
import baseUrl from "../enum/url";
import User from "./User";
import {logout} from "../features/userSlice";
import member from "../styles/member.css";

const MemberControl = (props) => {
    useEffect(() => {
        if (users.length === 0) {
            getUserList();
        }
        return () => {

        }
    });
    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);
    const {user} = useSelector(state => state.user);

    if (!user?.loggedIn) {
        return <Redirect to="/"/>;
    }
    const getUserList = () => {
        axios.get(
                baseUrl + 'member/all',
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            .then(response => {
                return setUsers(response.data.data);
            })
            .catch(console.log);
    }

    const deleteMember = (data) => {
        const email = data;

        axios.delete(
            baseUrl + 'member/' + email,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
            .then(response => {
                getUserList();
            })
            .catch(response => console.log(response))

    }

    const editMember = (data) => {
        console.log(data);
        axios.put(baseUrl + 'member/', data,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                console.log(response)
                getUserList();
            })
            .catch(reason => console.log(reason))
    }

    const onClickLogout = () => {
        dispatch(
            logout()
        );
        props.history.push('/');
    }

    return (
        <div>
            <div className="header-wrapper">
                <h1>Member</h1>
                <button className="logout_button" onClick={onClickLogout}>Logout</button>
            </div>
            <div className="body-wrapper">
                {users.map(user => (
                    <User user={user}
                          key={user.seq}
                          deleteMember={deleteMember}
                          editMember={editMember}/>
                ))}
            </div>
        </div>
    )
}

export default MemberControl;
