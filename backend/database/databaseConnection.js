const mongoose = require('mongoose');
const message = require('./databaseConnection/messageSchema')

const connectionUrl = 'mongodb+srv://talha:*123@chatdb.omhqe.mongodb.net/chat-app?retryWrites=true&w=majority'

mongoose.connect(connectionUrl, {useNewUrlParser: true, useUnifiedTopology:true});

mongoose.model('Messages', message);

const connection = mongoose.connection;

module.exports = connection;