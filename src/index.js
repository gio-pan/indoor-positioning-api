const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

// load environment variables
require('dotenv').config();

const port = process.env.PORT || 8080;
const mongoURL = process.env.MONGO_URL + process.env.MONGO_DB;

// initialize app, server, and socket io
const app = express();
const server = http.Server(app);
const io = socketIo(server);

// set io property to attach io object to app then access from controllers
app.set('io', io);

// set up database connection
// TODO: proper connecting to database (not connecting on first docker-compose up)
const options = {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
    reconnectTries: 60,
    reconnectInterval: 1000,
    connectTimeoutMS: 10000,
};

mongoose.connect(mongoURL, options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error: '));

// BACKEND API
// TODO: Logging
// set response headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
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
    socket.on('disconnect', (socket) => {
        console.log('A user disconnected from socket.io!');
    });
});

// start server
server.listen(port, () => {
    console.log(`Now listening on localhost:${port}`);
});
