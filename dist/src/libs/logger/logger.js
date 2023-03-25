"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winstonOptions = void 0;
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
const log_path = "log";
exports.winstonOptions = {
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), winston.format.align(), nest_winston_1.utilities.format.nestLike()),
        }),
        new winston.transports.File({
            format: winston.format.combine(winston.format.timestamp(), winston.format.align(), nest_winston_1.utilities.format.nestLike(), winston.format.uncolorize()),
            filename: log_path + "/combined.log",
            level: "info",
        }),
        new winston.transports.File({
            format: winston.format.combine(winston.format.timestamp(), winston.format.align(), nest_winston_1.utilities.format.nestLike(), winston.format.uncolorize()),
            filename: log_path + "/error.log",
            level: "error",
        }),
    ],
};
//# sourceMappingURL=logger.js.map