module.exports.successResponse = (data) => {
    return {
        success: true,
        data: data,
    };
}

module.exports.successResponseMsg = (message) => {
    return {
        success: true,
        message: message,
    };
}


module.exports.errorResponse = (message) => {
    return {
        success: false,
        error: {
            message: message,
        }
    };
}