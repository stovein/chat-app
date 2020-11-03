const mongoose = require('mongoose');
const Message = require('./messageSchema')

const connectionUrl = process.env.DATABASE_URI;
const options = {useNewUrlParser: true, useUnifiedTopology:true};

mongoose.connect(connectionUrl, options);

const DatabaseController = {
    findQueuedMessages: function(filter, callback) {
        Message.find({
            room_id: filter.room_id,
            sender: { $ne: filter.sender },
        }, (err, posts) => {
            if (err) throw err;
            callback(err, posts)
        })
    },
    deleteQueuedMessages: function(filter) {
        Message.deleteMany({
            room_id: filter.room_id,
            sender: { $ne: filter.sender },
        }, (err) => {
            if(err) throw err;
        });
    },
    createNewQueuedMessage: function(message) {
        Message.create({
            room_id: message.room_id,
            sender: message.sender,
            key: message.key,
            message: message.message,
            date: message.date
        });
    },
};

module.exports = DatabaseController;