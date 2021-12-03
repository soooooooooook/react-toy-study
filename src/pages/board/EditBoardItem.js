import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteReplyApi, getBoardItemApi, saveReplyApi} from "../../service/service";
import {Redirect, useParams} from "react-router-dom";

const BoardItem = () => {

    let {id} = useParams();
    const [itemDetail, setItemDetail] = useState(null)
    useDispatch();
    useEffect(() => {
        if (itemDetail === null) {
            getBoardItem(id)
        }
    })
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
                console.log(response);
            })
            .catch(reason => {
                console.log(reason)
            })
    }
    const {user} = useSelector(state => state.user);
    if (!user?.loggedIn) {
        return <Redirect to="/"/>;
    }
    if (!itemDetail) return "";
    return (
        <div className="body-layout">
            <div className="body-wrapper">
                <div className="header-area">
                    <button>수정</button>
                    <button>삭제</button>
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
                                <div className={item.content === '삭제된 댓글 입니다.' ? 'del' : ''}>{item.content}</div>
                                <button className="cp" onClick={() => deleteReply(item.seq)}>삭제</button>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

export default BoardItem;
