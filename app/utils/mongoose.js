const { default: mongoose } = require('mongoose');
const { HttpError } = require('../handlers/apiResponse');
const { errors } = require('../handlers/errors');

/**
 * Validates a Mongoose ObjectId.
 *
 * @param {string} objectId - The ObjectId to validate.
 * @throws {HttpError} Throws an HttpError if the ObjectId is invalid.
 */
const validateMongooseId = (objectId) => {
  if (!mongoose.Types.ObjectId.isValid(objectId)) {
    const { name, code } = errors[400];
    throw new HttpError('Invalid Id', name, [], code);
  }
};

module.exports = {
  validateMongooseId,
};
