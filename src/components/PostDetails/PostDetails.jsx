import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import { PostsContext } from "../../context/PostContext";
import { fetchCommentsByPostId, fetchPostsById, fetchUsersById } from "../../utils/api";
import Comments from "../Comment/Comment";

const PostDetails = () =>{
    const{postId} = useParams();
    const {comments, setComments} = useContext(PostsContext);
    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);
    const [newComment, setNewComment] = useState('');

    useEffect( () =>  {
        callBackFun();
    },[postId, post?.userId, setComments]);


    const callBackFun = async () => {
        await fetchPostsById(postId).then((response) => setPost(response.data));

        await fetchCommentsByPostId(postId).then((response) => 
        setComments((prev) => ({...prev, [postId] : response.data }))
        );
        fetchUsersById(1).then((response) => setUser(response.data));
    }

    const handleAddComment = () =>{
        if(!newComment.trim()) return;

        const newCommentData ={
            body: newComment,
            replies:[],
        };
        setComments((prev) => ({
            ...prev,
            [postId]: [...(prev[postId] || []), newCommentData]
        }));
        
    };

    return post ? (
        <div className="post-details">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            {user && (
                <div>
                    <strong>Name: </strong> {user.name}
                    <br/>
                    <strong>Email: </strong> {user.email}
                </div>
            )}
            <div>
                <h3>Comments:</h3>
                {comments[postId]?.map((comment) => (
                    <Comments
                    key={comment.id}
                    comment={comment}
                    postId = {postId}
                    setComments={setComments}
                    />
                ))}
            </div>
            <textarea placeholder="Add a comment..."
            onChange={(e) => setNewComment(e.target.value)}
            // onBlur={(e) => handleAddComment(e.target.value)}
            ></textarea>    
            <button onClick={handleAddComment}>Add comment</button>

        </div>) : (<p>Loading...</p>)
}

export default PostDetails;