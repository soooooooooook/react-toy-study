import React, {useState} from "react";
import {deleteMemberApi, editMemberApi} from "../service/service";

const User = (props) => {
    const [selectedUserInfo, setSelectedUser] = useState(props.history.location.state);

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
            <ul>
                <li>
                    <strong>Name :</strong> {selectedUserInfo.name}
                </li>
                <li>
                    <strong>email :</strong> {selectedUserInfo.email}
                </li>
                <li>
                    <strong>Authority :</strong> {selectedUserInfo.authority}
                </li>
            </ul>
            <div>
                {/*<button className="edit_button" onClick={editMember}>Edit</button>*/}
                <button className="edit_button del" onClick={deleteMember}>Delete</button>
            </div>
        </div>
    )
}

export default User;