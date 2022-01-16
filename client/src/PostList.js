import React, {useState, useEffect} from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
    const [posts, setPosts] = useState({});

    //use fetchPosts when the component firstly rendered on the screen
    const fetchPosts = async () =>{
        const response = await axios.get('http://post.com/posts')
        .catch((err) => {
            console.log(err.message);
        });
        setPosts(response.data);
    }

    useEffect(() =>{
        fetchPosts();
    }, []); // the second arg indicates only run this one time

    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div 
                className="card" 
                style={{ width: '30%', marginBottom: '20px'}}
                key={post.id}> 

                <div className="card-body" > 
                    <h3>{post.title}</h3>
                    <CommentList comments={post.comments}></CommentList>
                    <CommentCreate postId={post.id}></CommentCreate>
                </div>
            
            </div>
        );
    });
    return <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderedPosts}
    </div>
}

export default PostList;