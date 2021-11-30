import React from "react";

function Users(props) {
    const userEditPageMoveEvent = () => {
        props.editUser({email: props.user.email, name: props.user.name, authority: props.user.authority, address: props.user.address})
    }
    return (
        <div className="user-list cp" onClick={userEditPageMoveEvent}>
            <span>
                <span>{props.user.name}</span>
            </span>
            <span className="email">{props.user.email}</span>
            <span>{props.user.authority === 'ROLE_USER' ? 'USER' : 'ADMIN'}</span>
        </div>
    )
}

export default Users;
