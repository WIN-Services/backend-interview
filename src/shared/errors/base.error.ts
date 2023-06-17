

export class BaseError extends Error {
    public statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = "Base.Error";
        this.statusCode = 400;
    }
}