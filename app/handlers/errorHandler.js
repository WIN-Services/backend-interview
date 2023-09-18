const { HttpError } = require('./apiResponse');
const { errors } = require('./errors');

/**
 * Handles errors that occur during request processing.
 *
 * @param {Error} err - The error that occurred.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {Object} The response object with an error message.
 */
const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err.status === false) {
    return res.status(err.status_code).json(err);
  }

  const { name, code } = errors[500];
  const error = new HttpError('Server Error', name, [err], code);
  res.status(error.status_code).json(error);
};

module.exports = {
  errorHandler,
};
