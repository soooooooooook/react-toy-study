import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../features/userSlice";
import {Link} from "react-router-dom";


const Header = (props) => {
    const {user} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const logoutEvent = () => {
        dispatch(
            logout()
        );
    }
    if (!user) return '';

    return (
        <div className="header-wrapper">
            <h1>Toy Project</h1>
            <Link to="/board">board</Link>
            <Link to="/member">member</Link>
            <button className="logout_button" onClick={logoutEvent}>Logout</button>
        </div>
    )
}

export default Header;
