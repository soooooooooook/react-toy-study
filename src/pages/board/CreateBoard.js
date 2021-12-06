import React, {useState} from "react";
import {createBoardApi} from "../../service/service";

const CreateBoard = (props) => {
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            content: content,
            title: title
        }
        console.log(data);

        createBoardApi(data)
            .then(response => {
                console.log(response.data);
                props.history.push(`board/`);
            })
            .catch(reason => {
                console.log(reason);
            })
    }

    return (
        <div className="body-wrapper">
            <form className="d-flex-col" onSubmit={(e) => handleSubmit(e)}>
                <div className="d-flex mb-20 w-100">
                    <label htmlFor="" className="input_label mr-10">제목</label>
                    <input type="text"
                           placeholder="title"
                           value={title}
                           className="input_form d-grow"
                           onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <textarea
                    placeholder="content"
                    value={content}
                    className="w-100 h-300 mb-40"
                    onChange={(e) => setContent(e.target.value)}/>
                <div className="d-flex">
                    <button type="submit" className="button dark line ml-auto mr-10" onClick={() => {
                        props.history.push("/board")}}>취소
                    </button>
                    <button type="submit" className="button dark">등록
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateBoard;
