"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const env = process.env;
exports.config = {
    db: {
        host: env.DB_HOST,
        port: env.DB_PORT,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
    },
};
//# sourceMappingURL=config.js.map