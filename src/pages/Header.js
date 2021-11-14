import React from "react";

const Header = (props) => {
    const logoutEvent = () => {
        props.logout()
    }
    const moveBoardPageEvent = () => {
        props.moveBoardPage()
    }
    return (
        <div className="header-wrapper">
            <h1>Member</h1>
            <button onClick={moveBoardPageEvent}>게시판</button>
            <button className="logout_button" onClick={logoutEvent}>Logout</button>
        </div>
    )
}

export default Header;
