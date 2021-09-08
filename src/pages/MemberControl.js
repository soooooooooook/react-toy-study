import React from "react";

const MemberControl = () => {
    return (
        <div>
            <h1>member</h1>
            <button id="allButton">All</button>
            <div>
                <label htmlFor="email">email</label>
                <input type="text" id="email"/>
                    <button id="oneButton">search</button>
            </div>
            <ul className="data"></ul>
        </div>
    )
}

export default MemberControl;
