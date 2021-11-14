import React, {useState} from "react";
import Header from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {deleteMemberApi, editMemberApi} from "../service/service";
import {logout} from "../features/userSlice";

const User = (props) => {
    const dispatch = useDispatch();
    const [selectedUserInfo, setSelectedUser] = useState(props.history.location.state);

    const onClickLogout = () => {
        dispatch(
            logout()
        );
        props.history.push('/');
    }

    const deleteMember = () => {
        deleteMemberApi(selectedUserInfo.email)
            .then(() => {
                props.history.push('/member');
            })
            .catch(reason => console.log(reason));
    }

    // const editMember = (email) => {
    //     editMemberApi(email)
    //         .then(response => {
    //             return setMemberInfo(response.data.data);
    //         })
    //         .catch(reason => console.log(reason))
    // }

    return (
        <div>
            <Header
                logout={onClickLogout}
            />
            <div className="body-layout">
                <div className="body-wrapper">
                <ul className="user-info">
                    <li>
                        <div className="label"><strong>Name</strong></div>
                        <div>
                            {selectedUserInfo.name}
                        </div>
                    </li>
                    <li>
                        <div className="label"><strong>email</strong></div>
                        <div>
                            {selectedUserInfo.email}
                        </div>
                    </li>
                    <li>
                        <div className="label"><strong>Authority</strong></div>
                        <div>
                            {selectedUserInfo.authority}
                        </div>
                    </li>
                </ul>
                <div>
                    {/*<button className="edit_button" onClick={editMember}>Edit</button>*/}
                    <button className="edit_button">Edit</button>
                    <button className="edit_button del" onClick={deleteMember}>Delete</button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default User;
