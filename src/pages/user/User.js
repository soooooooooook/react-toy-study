import React, {useState} from "react";
import {deleteMemberApi, editMemberApi} from "../../service/service";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

const User = (props) => {
    const [selectedUserInfo, setSelectedUser] = useState(props.history.location.state);
    console.log(selectedUserInfo);
    const [viewMode, setViewMode] = useState(true);
    const deleteMember = () => {
        deleteMemberApi(selectedUserInfo.email)
            .then(() => {
                props.history.push('/member');
            })
            .catch(reason => console.log(reason));
    }

    const {user} = useSelector(state => state.user);
    if (!user?.loggedIn) {
        return <Redirect to="/"/>;
    }

    let token = localStorage.getItem('token');
    const auth = JSON.parse(token).auth;

    const editName = (name) => {
        const member = {...selectedUserInfo};
        member.name = name;
        setSelectedUser(member);

    }

    const editMember = () => {
        const data = {
            email: selectedUserInfo.email,
            name: selectedUserInfo.name
        }
        console.log('데이터',data);
        editMemberApi(data)
            .then(response => {
                setViewMode(true);
                console.log(response);
            })
            .catch(reason => console.log(reason))
    }

    return (
        <div className="body-layout">
            <div className="body-wrapper">
                <ul className="user-info">
                    <li>
                        <div className="label"><strong>Name</strong></div>
                        {
                            viewMode ?
                                <div>
                                    {selectedUserInfo.name}
                                </div>
                                :
                                <div><input type="text" value={selectedUserInfo.name}
                                            onChange={(e) => editName(e.target.value)}/></div>
                        }
                    </li>
                    <li>
                        <div className="label"><strong>email</strong></div>
                        <div>
                            {selectedUserInfo.email}
                        </div>
                    </li>
                    {auth !== "ROLE_USER" ?
                        <li>
                            <div className="label"><strong>Address</strong></div>
                            <div>
                                {selectedUserInfo.address.city},{selectedUserInfo.address.street},{selectedUserInfo.address.zipcode}
                            </div>
                        </li>
                        : ''
                    }
                    <li>
                        <div className="label"><strong>Authority</strong></div>
                        <div>
                            {selectedUserInfo.authority}
                        </div>
                    </li>
                </ul>
                {auth !== "ROLE_USER" ?
                    <div>
                        {
                            viewMode ?
                                <div>
                                    <button className="edit_button" onClick={() => setViewMode(false)}>Edit</button>
                                    <button className="edit_button" onClick={() => props.history.push("/member")}>목록
                                    </button>
                                </div>
                                :
                                <div>
                                    
                                <button className="edit_button" onClick={editMember}>완료</button>
                                    <button className="edit_button" onClick={() => props.history.push("/member")}>취소
                                    </button>
                                </div>
                        }
                        <button className="edit_button del" onClick={deleteMember}>Delete</button>
                    </div>
                    : ''
                }
            </div>
        </div>
    )
}

export default User;
