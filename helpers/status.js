const statusMessages = Object.freeze({
    SUCCESS: "Success",
    FAILED: "Failed",
    NOT_FOUND: "Not Found",
    BAD_REQUEST: "Bad Request",
    INTERNAL_SERVER_ERROR: "Internal Server Error",
    UNAUTHORIZED: "Unauthorized"
});

const statusCode = Object.freeze({
    SUCCESS: 200,
    FAILED: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    REQUEST_TIMED_OUT: 408,
    BAD_GATEWAY: 502
});

module.exports = {statusMessages, statusCode}