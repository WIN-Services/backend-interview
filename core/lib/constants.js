module.exports.apiResponses = {
  success: {
    http_code: 200,
    error_code: "",
    status: 200,
    description: "Success",
  },
  badRequest: {
    http_code: 400,
    error_code: "MISSING_FIELDS",
    status: 400,
    description: "Missing or invalid request",
  },
  unauthorized: {
    http_code: 403,
    error_code: "UNAUTHORIZED",
    status: 403,
    description: "Unauthorized access to requested resource",
  },
  notFound: {
    http_code: 404,
    error_code: "NOT_FOUND",
    status: 404,
    description: "Requested resource cannot be found",
  },
  internalError: {
    http_code: 500,
    error_code: "INTERNAL_SERVER_ERROR",
    status: 500,
    description: "Internal Server Error",
  }
};
