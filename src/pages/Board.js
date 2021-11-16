import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getBoardListApi} from "../service/service"
import Header from "./Header";
import BoardItems from "./BoardItems";
import {logout} from "../features/userSlice";
import board from "../styles/board.css"

const Board = (props) => {

    const [contentList, setContentList] = useState(null);

    useEffect(() => {
        if (contentList === null) {
            getBoardList();
        }
        console.table(contentList);
    });

    const dispatch = useDispatch();

    const onClickLogout = () => {
        dispatch(
            logout()
        );
        props.history.push('/');
    }

    const getBoardList = () => {
        getBoardListApi(0)
            .then(response => {
                const boardList = response.data.data.list;
                setContentList(boardList);
            })
            .catch(reason => {
                console.log(reason)
            })

    }

    const getBoardItem = (id) => {
        props.history.push('/board-detail/' + id);
    }

    const moveBoardCreatePage = () => {
        props.history.push('/board-create');
    }

    if (contentList === null) return ""
    return (
        <div>
            <Header
                logout={onClickLogout}
            />
            <div className="body-layout">
                <div className="body-wrapper">
                    <button className="write-button" onClick={moveBoardCreatePage}>글쓰기</button>
                    <div className="board-list-wrapper">
                        {contentList.map(item => (
                            <BoardItems
                                key={item["seq"]}
                                id={item["seq"]}
                                title={item["title"]}
                                count={item["viewCount"]}
                                email={item["memberEmail"]}
                                boardItem={getBoardItem}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Board;
