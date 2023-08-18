const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();

// Custom Imports
const userRoute = require('./routes/usersRoutes');
const orderRoute = require('./routes/ordersRoutes');
const servicesRoute = require('./routes/servicesRoutes');
const HttpError = require('./models/httpError');

const { sequelize } = require('./models/index');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next();
})

// Logging incoming api resquests to the terminal and to the file
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan(':method :url :status :res[content-length] :response-time ms :res[header]'));
app.use(morgan(':method :url :status :res[content-length] :response-time ms :res[header]', { stream: accessLogStream }));


// Routes
app.use('/users', userRoute);
app.use('/orders', orderRoute);
app.use('/services', servicesRoute);

// Unsupported/Unknown Routes
app.use((req, res, next) => {
    throw new HttpError('This route is not supported by me', 404);
});

// Handling Unhandled/Unknown Errors
app.use((error, req, res, next) => {
    console.log(error);
    if (res.headerSent) {
        return next(error);
    } else {
        return res.status(error.code || 500).json({ message: error.message || 'An unknown error occured!' })
    }
});

sequelize.authenticate().then( () => {
    console.log("Connected to Database :)")
});

module.exports = app;