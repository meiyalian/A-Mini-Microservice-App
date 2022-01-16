const express = require('express');
const { randomBytes } = require('crypto'); 
const app = express();
const cors = require('cors');
const axios = require('axios');

app.use(express.json());
app.use(cors());

let commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    let commentId = randomBytes(4).toString('hex');
    let { content } = req.body;

    let comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content: req.body.content });
    commentsByPostId[req.params.id] = comments;
    await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId, 
            content,
            postId: req.params.id,
            status: 'pending'
        }
           
    }).catch((err) => {
        console.log(err.message);
    });
    res.status(201).send(comments);
});

app.post('/events', async (req,res) => {
    let { type, data } = req.body;
    if (type === 'CommentModerated') {

        //update the moderated status 
        let { postId, id, status, content } = data;
        let comments = commentsByPostId[postId];
        let comment = comments.find(comment => {
            return comment.id === id;
        })
        comment.status = status;

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentUpdated',
            data: {
                id, 
                content,
                postId,
                status
            }
        }).catch((err) => {
            console.log(err.message);
        });
    }
    res.send({});
})

app.listen(4001,() =>{
    console.log("listen on port 4001");
});