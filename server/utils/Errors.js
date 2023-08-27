const ERROR_CONSTANTS = require('../constants/error');

function parseError(errMsg, substituteValues = {}) {
  let string = errMsg;
  if (errMsg && substituteValues && typeof substituteValues === 'object') {
    Object.keys(substituteValues).forEach((val) => {
      const regex = new RegExp(`<${val}>`, 'g');
      string = string.replace(regex, substituteValues[val]);
    });
  }
  return string;
}

class BaseError extends Error {
  constructor(errInfo, substituteValues = {}) {
    let errDetails = {
      message: 'Internal error',
      code: 500,
      statusCode: 500
    };
    if ((typeof errInfo === 'string' || typeof errInfo === 'number') && ERROR_CONSTANTS[errInfo]) {
      errDetails = ERROR_CONSTANTS[errInfo];
    } else if (typeof errInfo === 'object') {
      if (errInfo instanceof Error) {
        errDetails.message = errInfo.message;
        if (errInfo.statusCode) errDetails.statusCode = errInfo.statusCode;
        if (errInfo.code) errDetails.code = errInfo.code;
      } else errDetails = {...errDetails, ...errInfo};
    }
    super(errDetails.message);
    errDetails.message = (errDetails.message && typeof errDetails.message === 'object') ? JSON.stringify(errDetails.message) : errDetails.message;
    this.message = parseError(errDetails.message, substituteValues);
    this.code = errDetails.code;
    this.statusCode = errDetails.statusCode;
    this.name = this.constructor.name;
  }

  static handleMongooseValidation(e) {
    let err = e;
    switch (e.name) {
      case 'ValidationError': {
        const mongoose = require('mongoose');
        if (e instanceof mongoose.Error.ValidationError) {
          e.statusCode = 400;
          e.code = e.name;
          err = new BaseError(e);
          console.log(err);
        }
        break;
      }
      default:
        break;
    }
    return err;
  }
}

module.exports = BaseError;
