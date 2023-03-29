class ResponseCodes {
    constructor(data, message, error) {

    }

    success() {
        var data = {
            status: 200,
            message: this.message,
            data: this.data == null || this.data == undefined ? {} : this.data,
            error: {}
        }
        this.message = null;
        this.data = null

        return data;
    }

    badRequest() {
        var data = {
            status: 400,
            message: (this.message != null || this.message != undefined) ? this.message : "Oops! Invalid request, please recheck information!",
            data: {},
            error: this.error
        }
        this.message = null;
        this.error = null
        return data;
    }

    dataNotFound() {
        var data = {
            status: 404,
            message: (this.message != null || this.message != undefined) ? this.message : "Oops! Resource not found, try something different!",
            data: {},
            error: {}
        }
        this.message = null;
        return data;
    }

    unauthorized() {
        var data = {
            status: 401,
            message: (this.message != null || this.message != undefined) ? this.message : "Sorry! Unauthorized access requested!",
            data: {},
            error: this.error
        }
        this.message = null;
        this.error = null
        return data;
    }

    forbidden() {

        var data = {
            status: 403,
            message: (this.message != null || this.message != undefined) ? this.message : "Oops! Forbidden access",
            data: {},
            error: this.error
        }
        this.message = null;
        this.error = null
        return data;
    }

    serverError() {
        var data = {
            status: 500,
            message: (this.message != null || this.message != undefined) ? this.message : "Due to some technical issue we cannot process your request, please check back later!",
            data: {},
            error: this.error

        }
        this.message = null;
        this.error = null
        return data;
    }

    serverUnavailable() {
        var data = {
            status: 503,
            message: (this.message != null || this.message != undefined) ? this.message : "Sorry! Our servers are down right now, please check back later!",
            data: {},
            error: this.error
        }
        this.message = null;
        this.error = null
        return data;
    }
}
module.exports = ResponseCodes;
