import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteReplyApi, getBoardItemApi, saveReplyApi, editBoardApi, delBoardApi} from "../../service/service";
import {Redirect, useParams} from "react-router-dom";

const BoardItem = (props) => {

    let {id} = useParams();
    const [itemDetail, setItemDetail] = useState(null);
    const [viewMode, setViewMode] = useState(true);
    // const [editTile, setEditTitle] = useState(itemDetail.title);
    // const [editContent, setEditContent] = useState(null);

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

    const itemEdit = (type, value) => {
        const info = {...itemDetail};
        if (type === 'title') {
            info.title = value;
        }
        if (type === 'content') {
            info.content = value;
        }
        setItemDetail(info);
    }

    const editBoardItem = () => {
        const data = {
            seq: itemDetail.seq,
            title: itemDetail.title,
            content: itemDetail.content,
        }
        editBoardApi(data)
            .then((response) => {
                setViewMode(true);
                console.log(response);
            })
            .catch(reason => console.log(reason))
    }
    const delBoardItem = () => {
        delBoardApi(id)
            .then(() => {
                    props.history.push("/board");
                }
            )
            .catch(reason => console.log(reason))
    }
    const {user} = useSelector(state => state.user);
    if (!user?.loggedIn) {
        return <Redirect to="/"/>;
    }
    if (!itemDetail) return "";
    return (
        <div className="body-layout">
            {
                viewMode ?
                    <div className="body-wrapper">
                        <div className="header-area">
                            <button onClick={() => setViewMode(false)}>수정</button>
                            <button onClick={(delBoardItem)}>삭제</button>
                            <button onClick={() => {
                                props.history.push("/board");
                            }
                            }>목록</button>
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
                            {
                                itemDetail.replies.map(item => (
                                        <div className="reply-view-item" key={item.seq}>
                                            <div
                                                className={item.content === '삭제된 댓글 입니다.' ? 'del' : ''}>{item.content}</div>
                                            <button className="cp" onClick={() => deleteReply(item.seq)}>삭제</button>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </div>
                    :
                    <div className="body-wrapper">
                        <div>
                            <input type="text"
                                   value={itemDetail.title}
                                   onChange={(e) => itemEdit('title', e.target.value)}
                            />
                        </div>
                        <div>
                            <textarea
                                className="textarea"
                                value={itemDetail.content}
                                onChange={(e) => itemEdit('content', e.target.value)}
                            />
                        </div>
                        <button onClick={editBoardItem}>완료</button>
                        <button onClick={() => setViewMode(true)}>취소</button>
                    </div>
            }
        </div>
    )
}

export default BoardItem;
