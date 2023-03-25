"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv = require("dotenv");
const path = require("path");
const pkg = require("../package.json");
const utils_1 = require("./libs/env/utils");
dotenv.config({
    path: path.join(process.cwd(), process.env.NODE_ENV === "develop"
        ? `envs/.env.develop`
        : `envs/.env.production`),
});
console.log("env path", process.env.NODE_ENV, path.join(process.cwd(), `envs/.env.${process.env.NODE_ENV}`));
exports.env = {
    node: process.env.NODE_ENV || "development",
    isProduction: process.env.NODE_ENV === "production",
    isTest: process.env.NODE_ENV === "test",
    isDevelopment: process.env.NODE_ENV === "development",
    app: {
        name: (0, utils_1.getOsEnv)("APP_NAME"),
        version: pkg.version,
        description: pkg.description,
        host: (0, utils_1.getOsEnv)("APP_HOST"),
        routePrefix: (0, utils_1.getOsEnv)("APP_ROUTE_PREFIX"),
        port: (0, utils_1.getOsEnv)("APP_PORT"),
        banner: (0, utils_1.toBool)((0, utils_1.getOsEnv)("APP_BANNER")),
    },
    log: {
        level: (0, utils_1.getOsEnvOptional)("LOG_LEVEL"),
        json: (0, utils_1.toBool)((0, utils_1.getOsEnvOptional)("LOG_JSON")),
        output: (0, utils_1.getOsEnvOptional)("LOG_OUTPUT"),
        path: (0, utils_1.getOsPath)("LOG_PATH"),
        request: (0, utils_1.toBool)((0, utils_1.getOsEnvOptional)("LOG_REQUEST") || "true"),
        request_body: (0, utils_1.toBool)((0, utils_1.getOsEnvOptional)("LOG_REQUEST_BODY") || "false"),
        response: (0, utils_1.toBool)((0, utils_1.getOsEnvOptional)("LOG_RESPONSE") || "false"),
        error: (0, utils_1.toBool)((0, utils_1.getOsEnvOptional)("LOG_ERROR") || "false"),
    },
    mongoDb: {
        type: (0, utils_1.getOsEnv)("MONGO_TYPE"),
        host: (0, utils_1.getOsEnv)("MONGO_HOST"),
        username: (0, utils_1.getOsEnv)("MONGO_USERNAME"),
        password: (0, utils_1.getOsEnv)("MONGO_PASSWORD"),
        port: (0, utils_1.toNumber)((0, utils_1.getOsEnv)("MONGO_PORT")),
        database: (0, utils_1.getOsEnv)("MONGO_DATABASE"),
        synchronize: (0, utils_1.toBool)((0, utils_1.getOsEnv)("MONGO_SYNCHRONIZE")),
    },
    jwt: {
        accessKey: (0, utils_1.getOsEnv)("JWT_SECRET"),
        refreshKey: (0, utils_1.getOsEnv)("JWT_REFRESH"),
        expirationTime: (0, utils_1.getOsEnv)("JWT_EXPIRES_IN"),
        adminTokenSecret: (0, utils_1.getOsEnv)("ADMIN_TOKEN_SECRET"),
    },
};
//# sourceMappingURL=env.js.map