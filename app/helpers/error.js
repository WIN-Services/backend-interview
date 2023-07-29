class BaseError extends Error {
  constructor(code, message, error) {
    super(message);
    this.code = code || 500;
    this.error = error || 'INTERNAL_SERVER_ERROR';
  }
}

class ServerError extends BaseError {
  constructor(message) {
    super(500, message, 'INTERNAL_SERVER_ERROR');
  }
}

class BadRequestError extends BaseError {
  constructor(message) {
    super(400, message, 'BAD_REQUEST');
  }
}

class NotFoundError extends BaseError {
  constructor(message) {
    super(404, message, 'NOT_FOUND');
  }
}

class ForbiddenError extends BaseError {
  constructor(message) {
    super(403, message, 'FORBIDDEN');
  }
}

module.exports = {
  BaseError,
  ServerError,
  BadRequestError,
  NotFoundError,
  ForbiddenError
};
