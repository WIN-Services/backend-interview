const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');


app.use(bodyParser.json());

//Routes
app.use('/api/v1/service',require('./routes/serviceRouter'));
app.use('/api/v1/order',require('./routes/orderRoute'));


// error handling for unhandling routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

// middleware for error handling
 app.use(globalErrorHandler);

module.exports = app;




