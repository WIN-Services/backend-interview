"use strict";
// src/common/http-exception.ts
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(statusCode, message, error) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.error = error || null;
    }
}
exports.default = HttpException;
//# sourceMappingURL=http-exception.js.map