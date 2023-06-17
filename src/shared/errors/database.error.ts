import { BaseError } from "./base.error";

export class DatabaseError extends BaseError {
    public statusCode: number;
    constructor(message: string) {
        super(message);
        this.name = "Database.Error";
        this.statusCode = 422;
    }
    public static CONNECTION_STRING_NOT_FOUND = "Connection string not found!";
}