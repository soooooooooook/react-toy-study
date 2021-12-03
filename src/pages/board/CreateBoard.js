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
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text"
                       placeholder="title"
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}/>
                <input type="content"
                       placeholder="content"
                       value={content}
                       onChange={(e) => setContent(e.target.value)}/>
                <button type="submit">등록
                </button>
            </form>
        </div>
    )
}

export default CreateBoard;
