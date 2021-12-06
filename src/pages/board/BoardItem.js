import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteReplyApi, getBoardItemApi, saveReplyApi, editBoardApi, delBoardApi} from "../../service/service";
import {Redirect, useParams} from "react-router-dom";
import moment from "moment";

const BoardItem = (props) => {

    let {id} = useParams();
    const [itemDetail, setItemDetail] = useState(null);
    const [viewMode, setViewMode] = useState(true);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('token'))?.sub);
    const [thisItemEmail, setItemUserEmail] = useState(props.location.state);
    console.log('정보를알려다오', itemDetail);

    useDispatch();
    useEffect(() => {
        if (itemDetail === null) {
            getBoardItem(id);
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
        viewMode ?
            <div className="body-wrapper">
                <div className="header-area">
                    <div className="d-flex button-area mb-50">
                        <button onClick={() => {
                            props.history.push("/board");
                        }
                        } className="button line dark small">목록
                        </button>
                        {thisItemEmail === token ?
                            <div className="ml-auto">
                                <button onClick={() => setViewMode(false)}
                                        className="button line dark small mr-10">수정
                                </button>
                                <button onClick={delBoardItem} className="button line dark small">삭제</button>
                            </div>
                            :
                            ""
                        }
                    </div>
                    <div className="title-wrapper d-flex">
                        <div className="title bold mb-20">
                            {itemDetail.title}
                        </div>
                        <div className="d-flex sub-info">
                            <span className="mr-20"><strong>조회수 : </strong>{itemDetail.viewCount}회</span>
                            <span className="mr-20"><strong>작성자 : </strong>{itemDetail.memberEmail}</span>
                            <span><strong>작성일 : </strong>{moment(itemDetail.createDate).format('lll')}</span>
                        </div>
                    </div>
                </div>
                <div className="body-area">{itemDetail.content}</div>
                <div className="reply-wrapper">
                    <div className="d-flex mb-20 reply-container">
                        <h4 className="mr-10">댓글</h4>
                        <input type="text"
                               className="input_form d-grow mr-10"
                               onChange={(e) => setNewReply(e.target.value)}
                        />
                        <button className="button dark" onClick={saveReply}>등록</button>
                    </div>
                    {
                        itemDetail.replies.map(item => (
                                <div className="reply-view-item" key={item.seq}>
                                    <div className="reply-sub-info mb-10">
                                        <span>{item.memberEmail}</span>
                                        <span className="ver-line"/>
                                        <span>{moment(item.updateDate).format('lll')}</span>
                                        {
                                            item.memberEmail === token ?
                                                <div className="ml-auto">

                                                    <button className="button dark line small mr-10">수정</button>
                                                    <button className="button dark line small"
                                                            onClick={() => deleteReply(item.seq)}>삭제
                                                    </button>
                                                </div>
                                                : ''
                                        }
                                    </div>
                                    <div className="d-flex">
                                        <div
                                            className={item.deleted ? 'del' : ''}>{item.content}</div>
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
            :
            <div className="body-wrapper">
                <div className="d-flex mb-20 w-100">
                    <label htmlFor="" className="input_label mr-10">제목</label>
                    <input type="text"
                           value={itemDetail.title}
                           className="input_form d-grow"
                           onChange={(e) => itemEdit('title', e.target.value)}
                    />
                </div>
                <div>
                            <textarea
                                className="w-100 h-300 mb-40"
                                value={itemDetail.content}
                                onChange={(e) => itemEdit('content', e.target.value)}
                            />
                </div>
                <div className="d-flex">
                    <button onClick={() => setViewMode(true)} className="button dark line ml-auto mr-10">취소</button>
                    <button onClick={editBoardItem} className="button dark">완료</button>
                </div>
            </div>
    )
}

export default BoardItem;
