const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const crypto = require('crypto');
const mongoose = require('mongoose');
const Messages = require('./database/Messages.model');
const amqp = require('amqplib/callback_api');
const { consumer, publisher } = require('./rabbitmq/amqpScripts')
const { joinRoom, get, disconnect } = require('./socket/socketScripts')

require('dotenv').config();

const port = 5000;


// Routing
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Origin", "http://localhost:5672");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());

app.get('/' ,(req, res) => res.send('Hello World'))


// Database
const connectionUrl = process.env.DATABASE_URI
const options = {useNewUrlParser: true, useUnifiedTopology:true};

let numClients = {};

// WebSocket
io.on('connection', (socket) => {
    socket.on('joinPrivateChat', ({sender, room_id}) => {
        console.log(room_id);
        joinRoom(socket, room_id);
        numClients[room_id] = get(numClients, room_id, 0) + 1

        socket.on('requestAllMessages', (t) => {
            amqp.connect('amqp://localhost', function(err, conn) {
                if (err != null) throw err;
                consumer(room_id.toString(), conn, io, room_id);
            });
        })

        socket.on('chat', (data) => {
            data = {...data}//, publicKey}
            if (numClients[room_id] === 2) {
                console.log(numClients)
                io.sockets.to(room_id).emit('chat', data);
            }
            else {
                console.log(data)
                amqp.connect('amqp://localhost', function(err, conn) {
                    if (err != null) throw err;
                    publisher(room_id.toString(), conn, JSON.stringify(data));
                });
            }
            

        })
        
        disconnect(socket, numClients, room_id);
    })
})


http.listen(port, () => console.log(`Example app listening on port ${port}!`));