const express = require('express'); 
const axios = require('axios');

const app = express();
app.use(express.json());


app.post('/events', async (req, res) => {
    let { type, data } = req.body;

    if (type === 'CommentCreated') {
        let status = data.content.includes('orange') ? 'rejected' : 'approved';

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id, 
                content: data.content,
                postId: data.postId,
                status
            }
        }).catch((err) => {
            console.log(err.message);
        });
    }

    res.send({});
});


app.listen(4003,() =>{
    console.log("listen on port 4003");
});