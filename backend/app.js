require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const http = require('http').createServer(app);
const socketConnections = require('./socket/socketScripts');
const mongoose = require('mongoose');
const { joinRoom, requestMessages, dictGet, disconnect } = require('./socket/socketScripts')

const port = 5000;


// Routing
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());

app.get('/' ,(req, res) => res.send('Hello World'))


// WebSocket
const socketConnection = new socketConnections(http);


http.listen(port, () => console.log(`Example app listening on port ${port}!`));