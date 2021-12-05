import React from "react";
import "../../styles/board.css"

const BoardItems = (props) => {
    console.log(props)

    const boardItemEvent = () => {
        props.boardItem(props.id, props.email);
    };

    return (
        <tr onClick={boardItemEvent}>
            <td className="text-center">{props.id}</td>
            <td>{props.title}</td>
            <td className="text-center">{props.email}</td>
            <td className="text-center">{props.count}</td>
        </tr>
    )
}

export default BoardItems;
