class HttpError extends Error{
    constructor(message, errorCode){
        super(message);
        this.errorMessage = message;
        this.code = errorCode;
    }
}

module.exports = HttpError;