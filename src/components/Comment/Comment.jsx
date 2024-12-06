import React, {useState, useEffect, useContext} from "react";
import './Comment.css';

const Comments = ({comment, postId, setComments}) =>{

    const [showReplyBox, setShowReplyBox] = useState(false);
    const [replyText, setReplyText] = useState("");


    const handlReply = () => {
        if(!replyText.trim()) return;

        const newReply = {
            body : replyText,
            replies :[]
        };

        setComments((prev) => {
            const updatedComments = prev[postId].map((c) =>
            c.id === comment.id ? {
                ...c,
                replies: [...c.replies, newReply],
            } : c
            );

            return {
                ...prev,
                [postId] : updatedComments,
            };
        });

        setReplyText("");
        setShowReplyBox(false);

    }

    return <div className="comment">
        <p>{comment.body}</p>
        <button
        className="reply-button"
        onClick={() => setShowReplyBox(!showReplyBox)}
        >
            Reply
        </button>
        {showReplyBox && (
            <div className="reply-box">
                <textarea
                placeholder="Write a reply"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                ></textarea>
                <button onClick={handlReply}> Add Reply</button>
            </div>
        )}

        {comment?.replies?.length > 0 && (
            <div className="replies">
                {comment.replies.map((reply) => (
                     <Comments
                     key={reply.id}
                     comment={reply}
                     postId = {postId}
                     setComments={setComments}
                     />

                ))}
            </div>
        )}
    </div>
}

export default Comments;