import React from "react";
import "../../styles/board.css"

const BoardItems = (props) => {
    const boardItemEvent = () => {
        props.boardItem(props.id);
    };
    return (
        <div className="board-list-item" onClick={boardItemEvent}>
            <div className="list-number">{props.id}</div>
            <div className="list-title">{props.title}</div>
            <div className="list-count">{props.count}</div>
        </div>
    )
}

export default BoardItems;
