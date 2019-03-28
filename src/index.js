const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const socketIo = require('socket.io');

// load environment variables
require('dotenv').config();

// set up database connection
// for development, must import db.js into index.js after 'require('dotenv').config()' call
// so that process.env variables are defined
require('./db');

// initialize app, server, and socket io
const port = process.env.PORT || 8080;
const app = express();
const server = http.Server(app);
const io = socketIo(server);

// set io property to attach io object to app then access from controllers
app.set('io', io);

// BACKEND API
// logging
app.use(morgan('dev'));

// set response headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// allow req.body to be parsed into json
app.use(bodyParser.json());

// /api/v1 endpoints defined in routes/v1.js
app.use('/api/v1', require('./routes/v1'));

// default response
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

// socket.io logging on connect and disconnect
io.on('connection', (socket) => {
    console.log('A user connected to socket.io!');
    socket.on('disconnect', () => {
        console.log('A user disconnected from socket.io!');
    });
});

// start server
server.listen(port, () => {
    console.log(`Now listening on localhost:${port}`);
});
