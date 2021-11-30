import React, {useState} from "react";
import {deleteMemberApi} from "../../service/service";

const User = (props) => {
    const [selectedUserInfo, setSelectedUser] = useState(props.history.location.state);
    const deleteMember = () => {
        deleteMemberApi(selectedUserInfo.email)
            .then(() => {
                props.history.push('/member');
            })
            .catch(reason => console.log(reason));
    }

    let token =  localStorage.getItem('token');
    const auth = JSON.parse(token).auth;
    // const editMember = (email) => {
    //     editMemberApi(email)
    //         .then(response => {
    //             return setMemberInfo(response.data.data);
    //         })
    //         .catch(reason => console.log(reason))
    // }

    return (
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
                    { auth !== "ROLE_USER" ?
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
                { auth !== "ROLE_USER" ?
                    <div>
                        {/*<button className="edit_button" onClick={editMember}>Edit</button>*/}
                        <button className="edit_button">Edit</button>
                        <button className="edit_button del" onClick={deleteMember}>Delete</button>
                    </div>
                    : ''
                }
            </div>
        </div>
    )
}

export default User;
