import React, {useState} from "react";
import axios from "axios";



const PostCreate = () => {
    const [title, setTitle] = useState('');

    const onSubmit = async (event) =>{
        event.preventDefault(); // prevent execution when the browser loads the component
    
        await axios.post('http://post.com/posts/create', {
            title
        });
    
        setTitle('');
    }
    
    return <div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input 
                value={title} 
                onChange={e => setTitle(e.target.value)}
                className="form-control"></input> 
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
}

export default PostCreate;
