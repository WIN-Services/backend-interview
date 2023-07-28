const { validationResult } = require('express-validator')

/**
 * Removes extension from file
 * @param {string} file - filename
 */
exports.removeExtensionFromFile = file => {
  return file
    .split('.')
    .slice(0, -1)
    .join('.')
    .toString()
}

/**
 * Handles error by printing to console in development env and builds and sends an error response
 * @param {Object} res - response object
 * @param {Object} err - error object
 */
exports.handleError = (res, err) => {
  // Prints error in console
  if (process.env.NODE_ENV === 'development') {
    console.log(err)
  }
  // Sends error to user
  res.status(err.code).json({
    errors: {
      msg: err.message
    }
  })
}

/**
 * Builds error object
 * @param {number} code - error code
 * @param {string} message - error text
 */
exports.buildErrObject = (code, message) => {
  return {
    code,
    message
  }
}

/**
 * Builds error for validation files
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Object} next - next object
 */
exports.validationResult = (req, res, next) => {
  try {
    validationResult(req).throw()
    if (req.body.email) {
      req.body.email = req.body.email.toLowerCase()
    }
    return next()
  } catch (err) {
    return this.handleError(res, this.buildErrObject(422, err.array()))
  }
}

/**
 * Builds success object
 * @param {string} message - success text
 */
exports.buildSuccObject = message => {
  return {
    msg: message
  }
}

/**
 * Item not found
 * @param {Object} err - error object
 * @param {Object} item - item result object
 * @param {string} message - message
 */
exports.itemNotFound = (err, item, message) => {
  if (err) {
    return this.buildErrObject(422, err.message)
  }
  if (!item) {
    return this.buildErrObject(404, message)
  }
}

/**
 * Item already exists
 * @param {Object} err - error object
 * @param {Object} item - item result object
 * @param {string} message - message
 */
exports.itemAlreadyExists = (err, item, message) => {
  if (err) {
    return this.buildErrObject(422, err.message)
  }
  if (item) {
    return this.buildErrObject(422, message)
  }
}
