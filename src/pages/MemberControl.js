import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import axios from "axios";
import baseUrl from "../enum/url";
import Users from "./Users";
import {logout} from "../features/userSlice";
import "../styles/member.css";

const MemberControl = (props) => {
    useEffect(() => {
        if (users.length === 0) {
            getUserList();
        }
    });

    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const {user} = useSelector(state => state.user);
    const [selectedMemberInfo, setMemberInfo] = useState(null);
    const saveToken = localStorage.getItem('token');
    const tokenToObject = JSON.parse(saveToken);
    const headers = {headers:{'Authorization': `Bearer ${tokenToObject.accessToken}`}}

    if (!user?.loggedIn) {
        return <Redirect to="/"/>;
    }

    const getUserList = () => {
        axios.get(baseUrl + 'member/all', headers)
            .then(response => {
                return setUsers(response.data.data.content);
            })
            .catch(reason => console.log(reason));
    }

    const deleteMember = (data) => {
        const email = data;
        axios.delete(baseUrl + 'member/' + email, headers)
            .then(response => {
                getUserList();
            })
            .catch(reason => console.log(reason));
    }

    const editMember = (data) => {
        axios.get(baseUrl + 'member/?email=' + data, headers)
            .then(response => {
                return setMemberInfo(response.data.data);
            })
            .catch(reason => console.log(reason))
    }

    const changeName = () => {
        const data = { name: selectedMemberInfo.name, email: selectedMemberInfo.email }
        axios.put(baseUrl + 'member/', data, headers)
            .then(response => {
                getUserList();
            })
            .catch(reason => console.log(reason))
        setMemberInfo(null);
    }

    const changeAuth = () => {
        const data = { authority: selectedMemberInfo.authority, email: selectedMemberInfo.email };
        axios.put(baseUrl + 'member/auth', data, headers)
            .then(response => {
                getUserList();
            })
            .catch(reason => console.log(reason))
    }

    const changeInfo = () => {
        changeName();
        changeAuth();
    }

    const infoName = (name) => {
        const member = {...selectedMemberInfo};
        member.name = name;
        setMemberInfo(member);
    }

    const infoAuth = (auth) => {
        const member = {...selectedMemberInfo};
        member.authority = auth;
        setMemberInfo(member);
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
            <div className="body-layout">
                <div className="body-wrapper">
                {
                    selectedMemberInfo ?
                        <div className="editMember-wrapper">
                            <ul>
                                <li>
                                    <strong>Name :</strong>
                                    <input className="edit_form" type="name" value={selectedMemberInfo.name || ''}
                                           onChange={(e) => infoName(e.target.value)}/>
                                </li>
                                <li>
                                    <strong>Email :</strong>{selectedMemberInfo.email}
                                </li>
                                <li>
                                    <strong>Authority :</strong>
                                    <select className="edit_form" onChange={(e) => infoAuth(e.target.value)}>
                                        <option value="ROLE_USER">USER</option>
                                        <option value="ROLE_ADMIN">ADMIN</option>
                                    </select>
                                </li>
                            </ul>
                            <button className="done_button" onClick={changeInfo}>완료</button>
                        </div> : ''
                }
                <div className="table-header">
                    <div>Name</div>
                    <div>Email</div>
                    <div>Authority</div>
                </div>
                {users.map(user => (
                    <Users user={user}
                           key={user.seq}
                           deleteMember={deleteMember}
                           editMember={editMember}/>
                ))}
            </div>
            </div>
        </div>
    )
}

export default MemberControl;
