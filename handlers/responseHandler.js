const responseHandler = {
    success: function(data, message, statusCode) {
        return {
            success: true,
            message: message,
            data: data,
            statusCode: statusCode
        }
    },

    error: function(message, statusCode) {
        return {
            success: false,
            error: {
                message: message
            },
            statusCode: statusCode
        }
    },
    notFound: function(message, statusCode){
        return {
            success: false,
            error: {
                message: message
            },
            statusCode: statusCode
        }
    }
}

module.exports = responseHandler;