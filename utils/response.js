const globalConstants = require('../constants/global-constants');
const errorMessageConstants = require("../constants/error.messages");

module.exports.success = function (data) {
    return {status: globalConstants.SUCCESS, data: data}
}

module.exports.error = function (data) {
    let responseData = {}
    if(data.errorCode == errorMessageConstants.DATA_NOT_FOUND_ERROR_CODE) {
        responseData['status'] = globalConstants.SUCCESS;
        responseData['data'] = [];
        return responseData;
    }
    return {status: globalConstants.FAILED, error: data}
}

module.exports.invalid = function (message) {
    return {status: globalConstants.VALIDATION_FAILED, message: message}
}

module.exports.unauthorized = function (code, message, detailMessage) {
    return {status: globalConstants.AUTHENTICATION_FAILED, message: message, detailMessage: detailMessage, code: code}
}