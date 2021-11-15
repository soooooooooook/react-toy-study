import React from "react";
import board from "../styles/board.css"

const BoardItems = (props) => {
    console.log(props);
    const boardItemEvent = () => {
        props.boardItem(props.id);
    };
    return (
        <div className="board-list-item" onClick={boardItemEvent}>
            <div>{props.id}</div>
            <div>{props.title}</div>
            <div>{props.count}</div>
            <div>{props.email}</div>
        </div>
    )
}

export default BoardItems;
