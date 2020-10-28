const socketIO = require('socket.io');
let dbHandler = require('../database/databaseConnection');
dbHandler = new dbHandler();

let numClients = {};

module.exports = (server) => {
    let io = socketIO.listen(server);

    io.on('connection', socketCallback);

    function socketCallback(socket) {
        socket.on('joinPrivateChat', (room_id) => {
            joinRoom(socket, room_id);
            disconnect(socket, room_id);
        })
    
        socket.on('requestAllMessages', ({ room_id, sender }) => {
            requestMessages(socket, { room_id, sender });
        });
        
        socket.on('chat', (data) => {
            chatting(data);
        })    
    };


    const joinRoom = (socket, room_id) => {
        socket.join(room_id, () => {
            numClients[room_id] = dictGet(numClients, room_id, 0) + 1
        });
    }

    const requestMessages = (socket, filter) => {
        dbHandler.find(filter, (err, posts) => {
            if(err) throw err;
            io.sockets.to(socket.id).emit('chat', posts);
            dbHandler.delete(filter);
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
        dbHandler.create(data);
    }

    const disconnect = (socket, room_id) => {
        socket.on('disconnect', () => {
            numClients[room_id] -= 1;
        })
    }
}


const dictGet = (object, key, default_value) => {
    var result = object[key];
    return (typeof result !== "undefined") ? result : default_value;
}