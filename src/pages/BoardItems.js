import React from "react";

const BoardItems = (props) => {
    console.log(props);
    const boardItemEvent = () => {
        props.boardItem(props.id);
    };
    return (
        <div onClick={boardItemEvent}>
            <div>{props.id}</div>
            <div>{props.title}</div>
            <div>{props.count}</div>
            <div>{props.email}</div>
        </div>
    )
}

export default BoardItems;
