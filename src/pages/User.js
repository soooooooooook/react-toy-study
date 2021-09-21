import React from "react";

function User(props) {
    return <div>
        <span>{props.user.name}</span>
        <span>{props.user.email}</span>
        <span>{props.user.authority}</span>
    </div>;
}

export default User;