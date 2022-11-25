/**
 * Error module that creates the error response for any endpoint in below format
 * status: error
 * statusCode: XXX
 * message: XX XXXX
 */
 class ErrorHandler extends Error {
    constructor(statusCode, message) {
      super();
      this.statusCode = statusCode;
      this.message = message;
    }
  }
  
  const handleError = (err, res) => {
    let { statusCode, message } = err;
    if (!statusCode) {
      statusCode = 500;
      message = 'Internal Server error';
    }
    res.status(statusCode).send({
      status: 'error',
      statusCode,
      message,
    });
  };
  
  module.exports = {
    ErrorHandler,
    handleError,
  };