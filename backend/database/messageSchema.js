const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    room_id: Number,
    sender: String,
    key: String,
    message: String,
    date: Date
});

const Message = mongoose.model('Messages', schema);

module.exports = Message;