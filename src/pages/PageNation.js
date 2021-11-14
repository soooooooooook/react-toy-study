import React from "react";

function PageNation(props) {

    const pageActionsEvent = (value) => {
        props.pageActions(value)
    }

    const firstLastPageMoveEvent = (value) => {
        props.firstLastPageMove(value);
    }

    return (
        <div className="page-wrapper">
            <div onClick={() => firstLastPageMoveEvent(0)}>&#171;</div>
            {
                Array(props.page).fill(null).map((v, i) =>
                    <div key={i}
                         onClick={() => pageActionsEvent(i)}
                         className={props.currentPage === i ? 'active' : null}>{i + 1}</div>
                )
            }
            <div onClick={() => firstLastPageMoveEvent(1)}>&#187;</div>
        </div>
    )
}

export default PageNation;
