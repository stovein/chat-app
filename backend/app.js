const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const crypto = require('crypto');
const mongoose = require('mongoose');
const Messages = require('./database/Messages.model');

const port = 5000;


// Routing
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.json());

app.get('/' ,(req, res) => res.send('Hello World'))


// Database
const connectionUrl = 'mongodb+srv://talha:*123@chatdb.omhqe.mongodb.net/chat-app?retryWrites=true&w=majority'
const options = {useNewUrlParser: true, useUnifiedTopology:true};

let numClients = {};

// WebSocket
io.on('connection', (socket) => {
    socket.on('joinPrivateChat', ({sender, reciever, publicKey}) => {
        //const edch = crypto.createECDH('secp521r1');
        //const publicKey = edch.generateKeys();
        //databaseden sender reciever id çekimi
        // şimdilik kendi verdiğim idler reciever olacak
        
        const room_id = reciever;
        socket.join(room_id, () => {
            console.log(`${sender} Connected to ${room_id} room`)
        });

        numClients[room_id] = get(numClients, room_id, 0) + 1
        
        io.sockets.to(room_id).emit('allOnline', numClients[room_id] === 2 ? true : false);

        socket.on('setKeys', (publicKey) => {
            console.log('setlendim')
            socket.to(room_id).emit('getKeys', publicKey);
        })

        socket.on('chat', (data) => {
            data = {...data}//, publicKey}
            io.sockets.to(room_id).emit('chat', data);
        })
        socket.on('disconnect', () => {
            numClients[room_id] -= 1;
            console.log(numClients)
        })
    })
})


http.listen(port, () => console.log(`Example app listening on port ${port}!`));


function get(object, key, default_value) {
    var result = object[key];
    return (typeof result !== "undefined") ? result : default_value;
}