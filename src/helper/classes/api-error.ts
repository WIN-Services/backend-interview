class ApiError extends Error {
  status: number;
  constructor(msg: string, status = 404) {
    super(msg);
    this.status = status;
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  msg() {
    return this.message;
  }
  statusCode() {
    return this.status;
  }
}

export default ApiError;
