module.exports.successResponse = async (data) => {
    return {
        success: true,
        data: data,
    };
}

module.exports.successResponseMsg = async (message) => {
    return {
        success: true,
        message: message,
    };
}


module.exports.errorResponse = async (message) => {
    return {
        success: false,
        error: {
            message: message,
        }
    };
}