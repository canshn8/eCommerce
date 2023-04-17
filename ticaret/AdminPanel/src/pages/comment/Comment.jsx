import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { upComments } from '../../redux/apiCalls';
import "./comment.css"

export default function Comment() {


    const location = useLocation();
    const commentId = location.pathname.split("/")[2];
    const comments = useSelector((state) => state.comment.comments.find((comment) => comment._id === commentId))
    const [title, setTitle] = useState("");
    const [desc, setDes] = useState("");
    const dispatch = useDispatch();
    const comment = {title,desc}
    const handleUpdate = (id) => {
        upComments(id,comment,dispatch)
    }

    return (
        <div className="comment">
            <div className="commentTitleContainer">
                <h1 className="commentTitle">Kullanıcı: {comments.username}</h1>
            </div>
            <div className="commentTop">
                <div className="commentTopRight">
                    <div className="commentInfoTop">
                        <span className="commentInfoKey">ID:{comments._id}</span>
                        <span className="commentInfoValue"></span>
                    </div>
                    <div className="commentInfoBottom">
                        <span className="commentName">Kullanıcı: {comments.username}</span>
                        <span className="commentInfoValue"></span>
                    </div>
                </div>
            </div>
            <div className="commentBottom">
                <div className="commentFormLeft">
                    <label>Yorum Adı: <span>{comments.title}</span></label>
                    <label>İçerik: <span>{comments.comments}</span></label>
                </div>
            </div>
        </div>
    )
}
