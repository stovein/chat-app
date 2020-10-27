const joinRoom = (socket, room_id) => {
    socket.join(room_id, () => {
        console.log(`Connected to ${room_id} room`)
    });
}

const get = (object, key, default_value) => {
    var result = object[key];
    return (typeof result !== "undefined") ? result : default_value;
}

const disconnect = (socket, numClients, room_id) => {
    socket.on('disconnect', () => {
        numClients[room_id] -= 1;
        console.log(numClients)
    })
}

module.exports = {
    joinRoom,
    get,
    disconnect,
}