import React from "react";

function Users(props) {
    const deleteMemberEvent = () => {
        props.deleteMember(props.user.email);
    }
    const editMemberEvent = () => {
        props.editMember(props.user.email);
    }
    return (
        <div className="user-list">
            <span>
                <span>{props.user.name}</span>
            </span>
            <span className="email">{props.user.email}</span>
            <span>{props.user.authority === 'ROLE_USER' ? 'USER' : 'ADMIN'}</span>
            <button className="edit_button" onClick={editMemberEvent}>Edit</button>
            <button className="edit_button del" onClick={deleteMemberEvent}>Delete</button>
        </div>
    )
}

export default Users;
