export class CustomError {
    public error: Error;
    public errorCode?: number;
    public message: string;
    public stack?: string;

    constructor(error: Error, errCode?: number) {
        this.error = error;
        this.message = error.message;
        this.stack = error.stack;
        this.errorCode = errCode;
    }
}
