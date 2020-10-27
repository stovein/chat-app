const publisher = (q, conn, data) => {
    conn.createChannel((err, ch) => {
        if (err != null) throw err;
        ch.assertQueue(q, {durable: true});
        ch.sendToQueue(q, Buffer.from(data), {persistent: true});
    });
}

const consumer = (q, conn, io, room_id) => {
    conn.createChannel((err, ch) => {
        if (err != null) throw err;
        ch.assertQueue(q, {durable: true});
        ch.consume(q, (msg) => {
            console.log(msg.content.toString());
            io.sockets.to(room_id).emit('chat', JSON.parse(msg.content.toString()));
            ch.ack(msg);
        });
    });
}

module.exports = {
    publisher,
    consumer
}