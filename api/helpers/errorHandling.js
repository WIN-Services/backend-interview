'use strict'


module.exports.successResponse = async (data, code) => {
    return {
        success: true,
        data: data,
        statusCode: code
    };
}

module.exports.successResponseMsg = async (message, code) => {
    return {
        success: true,
        message: message,
        statusCode: code
    };
}


module.exports.errorResponse = async (message, statusCode) => {
    return {
        success: false,
        error: {
            message: message,
            statusCode: statusCode
        }
    };
}

