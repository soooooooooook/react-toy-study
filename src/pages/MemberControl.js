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
        return () => {

        }
    });
    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);
    const {user} = useSelector(state => state.user);
    const [selectedMemberInfo, setMemberInfo] = useState(null);
    // const [name, setName] = useState("");

    if (!user?.loggedIn) {
        return <Redirect to="/"/>;
    }
    const getUserList = () => {
        const saveToken = localStorage.getItem('token'); // string
        const tokenToObject = JSON.parse(saveToken);

        axios.get(
            baseUrl + 'member/all',
            {
                headers: {
                    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
                    'Authorization': `Bearer ${tokenToObject.accessToken}`
                }
            }
        )
            .then(response => {
                return setUsers(response.data.data.content);
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
        axios.get(
            baseUrl + 'member/?email=' + data,
            {
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            })
            .then(response => {
                return setMemberInfo(response.data.data);
            })
            .catch(reason => console.log(reason))
    }

    const changeName = () => {
        const data = {name: selectedMemberInfo.name, email: selectedMemberInfo.email}
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
        setMemberInfo(null);
    }

    const info = (name) => {
        const member = {...selectedMemberInfo};
        member.name = name;
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
            <div className="body-wrapper">
                {users.map(user => (
                    <Users user={user}
                           key={user.seq}
                           deleteMember={deleteMember}
                           editMember={editMember}/>
                ))}
                {
                    selectedMemberInfo ?
                        <div className="editMember-wrapper">
                            <div>
                                name: <input type="name" value={selectedMemberInfo.name || ''}
                                             onChange={(e) => info(e.target.value)}/>
                                email: {selectedMemberInfo.email}
                                authority: {selectedMemberInfo.authority}
                            </div>
                            <button onClick={changeName}>완료</button>
                        </div> : ''
                }
            </div>
        </div>
    )
}

export default MemberControl;
