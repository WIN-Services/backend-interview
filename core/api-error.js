class ApiError extends Error {
  constructor(message) {
    super(message);
    this.error_message = message;
    this.name = this.constructor.name;
  }
}
module.exports = ApiError;
