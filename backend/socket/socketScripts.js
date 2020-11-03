const socketIO = require('socket.io');
let DatabaseController = require('../database/databaseConnection');

let numClients = {};

function Socket(server) {
    socket = undefined;
    room_id = undefined

    const socketCallback = (s) => {
        socket = s;
        socket.on('joinPrivateChat', joinPrivateChat);
        
        socket.on('requestAllMessages', requestAllMessages);
        
        socket.on('chat', chatting);
    };

    const joinPrivateChat = (room) => {
        room_id = room
        socket.join(room_id, joinRoom)
        socket.on('disconnect', disconnect)
    }

    const joinRoom = () => {
        numClients[room_id] = dictGet(numClients, room_id, 0) + 1
    }

    const disconnect = (room_id) => {
        numClients[room_id] -= 1;
    }

    const requestAllMessages = (filter) => {
        DatabaseController.findQueuedMessages(filter, (err, posts) => {
            if(err) throw err;
            io.sockets.to(socket.id).emit('chat', posts);
            DatabaseController.deleteQueuedMessages(filter);
        });
    }

    const chatting = (data) => {
        data = {...data}
        io.sockets.to(data.room_id).emit('chat', data);
        if (numClients[data.room_id] !== 2) {
            oneOffline(data);
        }
    }

    const oneOffline = (data) => {
        DatabaseController.createNewQueuedMessage(data);
    }

    io = socketIO.listen(server);
    io.on('connection', socketCallback);
}


module.exports = Socket;

const dictGet = (object, key, default_value) => {
    var result = object[key];
    return (typeof result !== "undefined") ? result : default_value;
}