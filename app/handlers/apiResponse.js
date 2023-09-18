class HttpSuccess {
  constructor(message, data, status_code = 200) {
    this.status = true;
    this.message = message;
    this.data = data;
    this.status_code = status_code;
  }
}

class HttpError {
  constructor(message, name, errors, status_code) {
    this.error = name;
    this.status = false;
    this.status_code = status_code;
    this.message = message;
    this.errors = errors;
  }
}

module.exports = {
  HttpSuccess,
  HttpError,
};
