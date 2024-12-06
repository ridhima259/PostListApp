import React, {createContext , useState , useEffect } from "react";

export const PostsContext = createContext();

export const PostsProvider = ({children}) => {

    const [post, setPosts] = useState([]);
    const[comments, setComments] = useState(() => {
        const storedComments = localStorage.getItem("comments");
        return storedComments ? JSON.parse(storedComments) : {};
    })

    useEffect(() => {
        console.log("comments", comments)
        localStorage.setItem("comments", JSON.stringify(comments));
    },[comments])

    return (
        <PostsContext.Provider value ={{post, setPosts, comments, setComments}}>
            {children}
        </PostsContext.Provider>
    )

}
