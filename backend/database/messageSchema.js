const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    name: String,
    message: String,
    date: Date
})