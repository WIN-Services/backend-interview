"use strict";
// src/middleware/not-found.middleware.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const notFoundHandler = (request, response, next) => {
    const message = "Resource not found";
    response.status(404).send(message);
};
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=not-found.middleware.js.map