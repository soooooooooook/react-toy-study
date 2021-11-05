import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import Users from "./Users";
import Header from "./Header";
import {logout} from "../features/userSlice";
import PageNation from "./PageNation"
import {getUserListApi, changeNameApi, changeAuthApi} from "../service/service";
import "../styles/member.css";

const MemberList = (props) => {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        if (!users) {
            setUsers([]);
            getUserList(0);
        }
    }, [users]);
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);
    const [selectedMemberInfo, setMemberInfo] = useState(null);
    const [totalPage, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    if (!user?.loggedIn) {
        return <Redirect to="/"/>;
    }

    const getUserList = () => {
        getUserListApi(currentPage)
            .then(response => {
                setTotalPages(response.data.data.totalPages);
                setUsers(response.data.data.content);
            })
            .catch(reason => console.log(reason));
    }

    const changeName = () => {
        return changeNameApi(selectedMemberInfo.name, selectedMemberInfo.email)
    }

    const changeAuth = () => {
        return changeAuthApi(selectedMemberInfo.authority, selectedMemberInfo.email)
    }

    const changeInfo = () => {
        Promise.all([changeName(), changeAuth()])
            .then(() => {
                getUserList(currentPage)
            })
            .catch(reason => console.log(reason))
        setMemberInfo(null);
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

    const pageActions = (i) => {
        getUserList(i);
        setCurrentPage(i);
    }

    const firstLastPageMove = (value) => {
        if (value === 0) getUserList(0)
        else getUserList(totalPage - 1)
    }

    const moveUserPage = (personInfo) => {
        props.history.push('/User', personInfo);
    }

    if (!users) return '<div>로딩중</div>';
    return (
        <div>
            <Header
                logout={onClickLogout}
            ></Header>
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
                    <div className="page-list-wrapper">
                        {users.map(user => (
                            <Users user={user}
                                   key={user.seq}
                                   editUser={moveUserPage}
                            />
                        ))}
                    </div>
                    <PageNation page={totalPage}
                                pageActions={pageActions}
                                currentPage={currentPage}
                                firstLastPageMove={firstLastPageMove}/>
                </div>
            </div>
        </div>
    )
}

export default MemberList;