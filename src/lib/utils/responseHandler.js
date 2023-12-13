const { SUCCESS_STATUS_CODE, ERROR_STATUS_CODE, NOT_FOUND_STATUS_CODE, BAD_REQUEST_STATUS_CODE } = require("../constants/response");

class ResponseHandler {
  static success(data, message = SUCCESS_STATUS_CODE, statusCode = 200) {
    return {
      success: true,
      data,
      message,
      status: statusCode,
    };
  }

  static error(message = ERROR_STATUS_CODE, status = 500) {
    return {
      success: false,
      error: {
        message,
      },
      status,
    };
  }

  static notFound(message = NOT_FOUND_STATUS_CODE) {
    return {
      success: false,
      error: {
        message,
      },
      status: 404,
    };
  }

  static badRequest(message = BAD_REQUEST_STATUS_CODE) {
    return {
      success: false,
      error: {
        message,
      },
      status: 400,
    };
  }
}

module.exports = ResponseHandler;
