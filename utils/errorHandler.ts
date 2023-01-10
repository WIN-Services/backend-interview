export class ServiceError extends Error {
    public code: number;
    public params: any[];
    public message: string;
    constructor(
        err: { msg: string; code: number },
        public info: string,
        ...ar: any
    ) {
        super(err.msg);

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ServiceError);
        }

        this.name = "SERVICE_ERROR";
        this.message = err.msg;
        this.code = err.code;
        this.info = info;
        this.params = ar;
    }
}

export const ErrorConstants = {
    INVALID_REQUEST_PAYLOAD: {
        msg: "INVALID_REQUEST_PAYLOAD",
        code: 400,
    },
    DATA_NOT_FOUND: {
        msg: "DATA_NOT_FOUND",
        code: 404,
    },
    UNAUTHORIZED_FOR_ACTION: {
        msg: "UNAUTHORIZED_FOR_ACTION",
        code: 401,
    },
    INTERNAL_SERVER_ERROR: {
        msg: "INTERNAL_SERVER_ERROR",
        code: 500,
    },
};
