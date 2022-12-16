"use strict";
// src/middleware/error.middleware.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, request, response, next) => {
    const status = error.statusCode || error.status || 500;
    response.status(status).send(error);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map