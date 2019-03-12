const mongoose = require('mongoose');

// for development, must import this file into index.js after 'require('dotenv').config()' call
// so that process.env variables are defined
const mongoUrl = process.env.MONGO_URL + process.env.MONGO_DB;

// connection options
const options = {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    reconnectTries: 60,
    reconnectInterval: 1000,
};

// function to connect with retries every 5 seconds if failed
const connectDbWithRetry = async () => {
    try {
        const connection = await mongoose.connect(mongoUrl, options);
        console.log('Successfully connected to Mongo');
        return connection;
    } catch (err) {
        console.error('Error connecting to Mongo on startup - trying again in 5 seconds', err)
        setTimeout(connectDbWithRetry, 5000);
    }
}

mongoose.connection.on('disconnected', () => { console.log('Mongo is disconnected'); });
mongoose.connection.on('close', () => { console.log('Mongo connection is closed'); });
mongoose.connection.on('index', (err) => { console.log('Error building index: ' + err); });

// close connection on signal
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose connection closed due to app termination');
        process.exit(0);
    });
});

// actual function call
connectDbWithRetry();
