const mongoose = require('mongoose');
const message = require('./messageSchema');

module.exports = mongoose.model('Messages', message);