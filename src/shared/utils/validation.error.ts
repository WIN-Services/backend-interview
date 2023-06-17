import { CustomError } from "./custom.error";

interface IValidationError {
    ValidationCode: number | string;
    ValidationMessage: string;
    Data: Record<string, string> | null;
}

export class ValidationError extends CustomError {
    public validationFailures: string[] | IValidationError[] = [];
    public payload: { [key: string]: any } | undefined;

    constructor(validationFailures: string[] | IValidationError[], payload?: { [key: string]: any }) {
        super({ message: "Validation failed!", name: "ValidationError" });
        this.validationFailures = validationFailures;
        if (payload) {
            this.payload = payload;
        }
    }
}
