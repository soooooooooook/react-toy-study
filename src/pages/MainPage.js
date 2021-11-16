import React from "react";
import {Link} from "react-router-dom";
import Header from "./Header";

const MainPage = () => {
    return (
        <div>
            <Header/>
            <div className="body-layout">
                <div className="body-wrapper">
                    <link to="/member">멤버</link>
                    <link to="/board">게시판</link>
                </div>
            </div>
        </div>
    )
}

export default MainPage;