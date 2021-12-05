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
            <h1 className="logo">Toy Project</h1>
            <div className="ml-auto d-flex button-wrapper">
                <Link to="/board" className="menu button line dark">Board</Link>
                <Link to="/member" className="menu button line dark">Member</Link>
                <button className="button dark" onClick={logoutEvent}><span>{JSON.parse(localStorage.getItem('token')).sub}</span><span className="ver-line white"/>Logout</button>
            </div>
        </div>
    )
}

export default Header;
