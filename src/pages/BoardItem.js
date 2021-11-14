import React, {useEffect, useState} from "react";
import Header from "./Header";
import {useDispatch} from "react-redux";
import {logout} from "../features/userSlice";
import {deleteReplyApi, getBoardItemApi, saveReplyApi} from "../service/service";
import {useParams} from "react-router-dom";


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
            <div>{itemDetail.title}</div>
            <div>{itemDetail.content}</div>
            <div>{itemDetail.viewCount}</div>
            <div>{itemDetail.memberEmail}</div>
            <div>{itemDetail.createDate}</div>
            <div>
                <input type="text"
                       onChange={(e) => setNewReply(e.target.value)}
                />
                <button onClick={saveReply}>등록</button>
            </div>
            {itemDetail.replies.map(item => (
                <div key={item.seq}>
                    <div>{item.content}</div>
                    <button onClick={() => deleteReply(item.seq)}>삭제</button>
                </div>
                )
            )}
        </div>
    )
}

export default BoardItem;
