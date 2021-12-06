import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import Users from "./Users";
import PageNation from "../compnent/PageNation"
import {getUserListApi} from "../../service/service";
import "../../styles/member.css";
import _ from "lodash";

const MemberList = (props) => {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        if (!users) {
            setUsers([]);
            getUserList(0);
        }
    }, [users]);
    const {user} = useSelector(state => state.user);
    const [totalPage, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    if (!user?.loggedIn) {
        return <Redirect to="/"/>;
    }

    const getUserList = () => {
        getUserListApi(currentPage)
            .then(response => {
                setTotalPages(response.data.data.totalSize);
                setUsers(response.data.data.list);
            })
            .catch(reason => console.log(reason));
    }

    const pageActions = (i) => {
        deb_page(i);
        setCurrentPage(i);
    }

    const deb_page = _.debounce((i) => {
        getUserList(i);
    }, 3000)

    const firstLastPageMove = (value) => {
        if (value === 0) getUserList(0)
        else getUserList(totalPage - 1)
    }

    const moveUserPage = (personInfo) => {
        props.history.push('/user', personInfo);
    }
    if (!users) return '<div>로딩중</div>';
    return (
        <div className="body-wrapper">
            <table>
                <thead>
                <tr>
                    <th className="sticky-header">Name</th>
                    <th className="sticky-header">Email</th>
                    <th className="sticky-header">Authority</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <Users user={user}
                           key={user.seq}
                           editUser={moveUserPage}
                    />
                ))}
                </tbody>
            </table>
            {/*<PageNation page={totalPage}*/}
            {/*            pageActions={pageActions}*/}
            {/*            currentPage={currentPage}*/}
            {/*            firstLastPageMove={firstLastPageMove}/>*/}
        </div>
    )
}

export default MemberList;
