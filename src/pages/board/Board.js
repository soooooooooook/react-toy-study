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

    const getBoardItem = (id, email) => {
        props.history.push('/detail/' + id, email);
    }

    const moveBoardCreatePage = () => {
        props.history.push('/create');
    }

    if (contentList === null) return ""
    return (
        <div className="body-layout">
            <div className="body-wrapper">
                <div className="d-flex">
                    <button className="button line dark mb-20 ml-auto" onClick={moveBoardCreatePage}>글쓰기</button>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                        <tr>
                            <th className="fixed-header">No</th>
                            <th className="fixed-header">Title</th>
                            <th className="fixed-header">Writer</th>
                            <th className="fixed-header">Count</th>
                        </tr>
                        </thead>
                        <tbody>
                        {contentList.map(item => (
                            <BoardItems
                                key={item["seq"]}
                                id={item["seq"]}
                                title={item["title"]}
                                count={item["viewCount"]}
                                email={item["memberEmail"]}
                                reply={item["replies"]}
                                boardItem={getBoardItem}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Board;
