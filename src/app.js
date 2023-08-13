const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes'); 

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use your API routes
app.use('/api', routes);

module.exports = app;
