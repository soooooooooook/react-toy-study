import React from "react";

const Header = (props) => {
    const logoutEvent = () => {
        props.logout()
    }
    return (
        <div className="header-wrapper">
            <h1>Member</h1>
            <button className="logout_button" onClick={logoutEvent}>Logout</button>
        </div>
    )
}

export default Header;