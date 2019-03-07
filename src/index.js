const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

// TODO: environment variables
const port = process.env.PORT || 8080;
const mongoURL = process.env.MONGO_URL || config.mongo_url;

const app = express();

// set up database connection
// TODO: proper connecting to database
// TODO: not connecting on first docker-compose up
const options = {
    user: config.mongo_user,
    pass: config.mongo_password,
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

// start server
app.listen(port, () => {
    console.log(`Now listening on localhost:${port}`);
});

module.exports = app;
