import React from "react";
import './App.css';
import PostList from './components/PostList/PostList';
import { PostsProvider } from './context/PostContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostDetails from "./components/PostDetails/PostDetails";

function App() {
  return (
    <PostsProvider>
      <Router>
        <div className='app'>
          <Routes>
            {/* Listing page */}
            <Route path="/" element={<PostList/>}/>
            <Route path="/post/:postId" element={<PostDetails/>}/>
          </Routes>
        </div>
      </Router>
    </PostsProvider>
  );
}

export default App;
