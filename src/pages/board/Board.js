import React, {useEffect, useState} from "react";
import {getBoardListApi} from "../../service/service"
import BoardItems from "./BoardItems";
import {Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import PageNation from "../compnent/PageNation";


const Board = (props) => {
    const [contentList, setContentList] = useState(null);

    useEffect(() => {
        if (contentList === null) {
            getBoardList();
        }
        console.table(contentList);
    });
    const {user} = useSelector(state => state.user);
    if (!user?.loggedIn) {
        return <Redirect to="/"/>;
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
        props.history.push('/detail/' + id);
    }

    const moveBoardCreatePage = () => {
        props.history.push('/create');
    }

    const tableWidth = {
        a:'width: 10%',
        b:'width: 80%',
        c:'width: 10%',
    }

    if (contentList === null) return ""
    return (
        <div className="body-layout">
            <div className="body-wrapper">
                <button className="write-button" onClick={moveBoardCreatePage}>글쓰기</button>
                <div className="table-header">
                    <div style={tableWidth.a}>no</div>
                    <div style={tableWidth.b}>title</div>
                    <div style={tableWidth.c}>count</div>
                </div>
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
                <PageNation/>
            </div>
        </div>
    )
}
export default Board;
