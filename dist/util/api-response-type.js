Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.SuccessResponse = exports.BadRequestError = void 0;
class BadRequestError {
    constructor(message, data) {
        this.error = true;
        this.status = 400;
        this.data = {
            success: false,
            code: 400,
            error: 'Bad Request',
            message: null,
            data: null
        };
        this.data.message = message || this.data.error;
        this.data.data = data;
    }
    ;
}
exports.BadRequestError = BadRequestError;
class SuccessResponse {
    constructor(data) {
        this.error = false;
        this.status = 200;
        this.data = data || { success: true };
    }
}
exports.SuccessResponse = SuccessResponse;
exports.serverError = {
    error: true,
    status: 500,
    data: ''
};
