import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "./newComment.css";
import { addComment } from "../../redux/apiCalls";

export default function NewUser() {
    const username = useSelector((state) => state.user.currentUser.username)
    console.log(username)
    // const [username,setUsername] = useState("")
    const [title, setTitle] = useState("")
    const [comments, setComments] = useState("")
    const dispatch = useDispatch()

    const com = useSelector((state) => state.comment.comments)
    console.log(com)

    const comment = { username, title, comments }
    const hanldeAdd = (e) => {
        e.preventDefault();
        addComment(comment, dispatch);
    };

    return (
        <div className="newComment">
            <h1 className="addCommentTitle">Yeni Yorum</h1>
            <form className="addCommentForm">
                <div className="addCommentItem">
                    <label>Başlık</label>
                    <input placeholder="Yorum Başlığı" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="addCommentItem">
                    <textarea placeholder="Açıklama" cols={50} type="text" value={comments} onChange={(e) => setComments(e.target.value)} />
                </div>
                <button onClick={(e) => hanldeAdd(e)} className="addCommentBtn">Oluştur</button>
            </form>
        </div>
    );
}