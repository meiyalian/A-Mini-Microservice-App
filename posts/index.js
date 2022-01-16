const express = require('express');
const { randomBytes } = require('crypto'); 
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

let posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts/create', async (req, res) => {
    let id = randomBytes(4).toString('hex');
    let { title } = req.body;

    posts[id] = {
        id, title
    };

    await axios.post('http://event-bus-srv:4005/events', {
        type: 'PostCreated',
        data: {
            id, title
        }
    }).catch((err) => {
        console.log(err.message);
    });
    res.status(201).send(posts[id]);

});

app.post('/events', (req,res) => {
    console.log("Received event", req.body.type);
    res.send({});
});
app.listen(4000,() =>{
    console.log("listen on port 4000");
});