import React, {useState , useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "../../context/PostContext";
import { fetchPosts } from "../../utils/api";
import "./PostList.css";


const PostList = () => {
    const {post, setPosts} = useContext(PostsContext);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts().then((response) => setPosts(response.data));
    },[setPosts]);


    const filteredPosts = post.filter((post) => {
        post.title.toLowerCase().includes(search.toLowerCase())
    });

    return (
        <div className="post-list">
            <input
            type="text"
            placeholder="Search a post..."
            value ={search}
            onChange={(e) => setSearch(e.target.value)}
            className = "search-bar"
            />
            <ul>
            {post.map((post) => (
                <li key={post.id} onClick={() => navigate(`/post/${post.id}`)}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </li>
            ))}
            </ul>

        </div>
    )
}

export default PostList;