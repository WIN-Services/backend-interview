"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoConfig = void 0;
const path_1 = require("path");
const env_1 = require("../env");
console.log("envs: MongoDb", env_1.env.mongoDb);
console.log("path Mongo Entity:", (0, path_1.join)(__dirname, "..", "**", "**", "*.entity.{js,ts}"));
exports.mongoConfig = {
    name: "mongo",
    type: "mongodb",
    host: env_1.env.mongoDb.host,
    port: env_1.env.mongoDb.port,
    database: env_1.env.mongoDb.database,
    useNewUrlParser: true,
    synchronize: true,
    useUnifiedTopology: true,
    logging: true,
    entities: [(0, path_1.join)(__dirname, "..", "**", "**", "*.entity.{js,ts}")],
};
//# sourceMappingURL=typeorm.config.js.map