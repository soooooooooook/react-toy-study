import React from "react";

function Users(props) {
    const userEditPageMoveEvent = () => {
        props.editUser({email: props.user.email, name: props.user.name, authority: props.user.authority, address: props.user.address})
    }
    return (
        <tr onClick={userEditPageMoveEvent}>
            <td className="text-center">{props.user.name}</td>
            <td className="text-center">{props.user.email}</td>
            <td className="text-center">{props.user.authority === 'ROLE_USER' ? 'USER' : 'ADMIN'}</td>
        </tr>
    )
}

export default Users;
