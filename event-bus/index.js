const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const events = [];

app.post('/events', (req, res) => {
    let event = req.body;
    events.push(event); 

    //send to other services
    axios.post('http://post-clusterip-srv:4000/events', event).catch((err) => {
        console.log(err.message);
    });
    axios.post('http://comments-srv:4001/events', event).catch((err) => {
        console.log(err.message);
    });
    axios.post('http://query-srv:4002/events', event).catch((err) => {
        console.log(err.message);
    });
    axios.post('http://moderation-srv:4003/events', event).catch((err) => {
        console.log(err.message);
    });

    console.log(events); 
    
    res.send({status: 'OK'});

});

app.get('/events', (req, res) => {
    res.send(events);
});

app.listen(4005,() =>{
    console.log("listen on port 4005");
});