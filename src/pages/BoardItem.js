import React, {useEffect, useState} from "react";
import Header from "./Header";
import {useDispatch} from "react-redux";
import {logout} from "../features/userSlice";
import {deleteReplyApi, getBoardItemApi, saveReplyApi} from "../service/service";
import {useParams} from "react-router-dom";
import board from "../styles/board.css"

const BoardItem = (props) => {
    console.log('프롭', props)
    // const id = props.location.state;
    let {id} = useParams();
    console.log(id);
    const [itemDetail, setItemDetail] = useState(null)
    const dispatch = useDispatch();
    useEffect(() => {
        if (itemDetail === null) {
            getBoardItem(id)
        }
    })
    const onClickLogout = () => {
        dispatch(
            logout()
        );
        props.history.push('/');
    }
    const getBoardItem = () => {
        getBoardItemApi(id)
            .then(response => {
                setItemDetail(response.data.data);
            })
            .catch(reason => {
                console.log(reason);
            })

    }

    const [newReply, setNewReply] = useState(null);
    const saveReply = () => {
        const data = {
            boardSeq: id,
            content: newReply
        }
        saveReplyApi(data)
            .then(response => {
                console.log(response.data);
                getBoardItem();
            })
            .catch(reason => {
                console.log(reason);
            })
    }

    const deleteReply = (id) => {
        deleteReplyApi(id)
            .then(response => {
                getBoardItem()
            })
            .catch(reason => {
                console.log(reason)
            })
    }
    console.log(itemDetail);
    if (!itemDetail) return "";
    return (
        <div>
            <Header
                logout={onClickLogout}
            />
            <div className="body-layout">
                <div className="body-wrapper">
                    <div className="header-area">
                        <div className="title">{itemDetail.title}</div>
                        <div className="sub-info">
                            <div><strong>조회수 : </strong>{itemDetail.viewCount}회</div>
                            <div><strong>작성자 : </strong>{itemDetail.memberEmail}</div>
                            <div><strong>작성일 : </strong>{itemDetail.createDate}</div>
                        </div>
                    </div>
                    <div className="body-area">{itemDetail.content}</div>
                    <div className="reply-wrapper">
                        <h4>댓글</h4>
                        <div className="reply-input-wrapper">
                            <input type="text"
                                   className="input_form"
                                   onChange={(e) => setNewReply(e.target.value)}
                            />
                            <button className="cp regist_button" onClick={saveReply}>등록</button>
                        </div>
                        {itemDetail.replies.map(item => (
                                <div className="reply-view-item" key={item.seq}>
                                    <div className={item.content === '삭제된 댓글 입니다.' ? 'del':''}>{item.content}</div>
                                    <button className="cp" onClick={() => deleteReply(item.seq)}>삭제</button>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BoardItem;
