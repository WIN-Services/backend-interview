const AppError = require('./../utils/appError');

const sendErrorDev= (err, res) => {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  };

  
 module.exports = (err, req, res, next) => {
     err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // error for development env
    sendErrorDev(err, res);

    // if (process.env.NODE_ENV === 'development') {
    //   sendErrorDev(err, res);
    // } else if (process.env.NODE_ENV === 'production') {
    //   // production code goes here
    // }
  };