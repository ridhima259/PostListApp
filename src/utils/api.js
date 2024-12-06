import axios from "axios";


export const fetchPosts = () => 
    axios.get(" https://jsonplaceholder.typicode.com/posts");

export const fetchPostsById = (postId) => 
    axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);

export const fetchUsersById = (userId) => 
    axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);

export const fetchCommentsByPostId = (postId) => 
    axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
