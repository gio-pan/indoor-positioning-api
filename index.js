const bodyParser = require('body-parser');
const express = require('express')

const port = process.env.PORT || 4000;

const app = express();

// backend API
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json());
app.use('/api/v1', require('./routes/v1'));

app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

// start server
app.listen(port, () => {
  console.log(`Now listening on localhost:${port}`);
});

module.exports = app;
