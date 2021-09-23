import React, {useState} from "react";
import baseUrl from "../enum/url";
import axios from "axios";

function User(props) {
    const [name, setName] = useState(props.user.name);
    const [inputShow, setInput] = useState('');

    const deleteMemberEvent = () => {
        props.deleteMember(props.user.email);
    }
    const editMemberEvent = () => {
        props.editMember({email: props.user.email, name: name});
        setInput('');
    }

    return (
        <div className="user-list">
            <span>{props.user.name}</span>
            {
                inputShow ?
                <div><input type="name" value={name} onChange={(e) => setName(e.target.value)}/><button onClick={editMemberEvent}>완료</button></div> : null
            }
            <span className="email">{props.user.email}</span>
            <span>{props.user.authority}</span>
            <button className="delete_button" onClick={() => setInput(!inputShow)}>Edit</button>
            <button className="delete_button" onClick={deleteMemberEvent}>Delete</button>
        </div>
    )
}

export default User;
