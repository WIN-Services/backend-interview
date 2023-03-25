import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import { env } from "../env";
console.log("envs: MongoDb", env.mongoDb);
console.log(
  "path Mongo Entity:",
  join(__dirname, "..", "**", "**", "*.entity.{js,ts}")
);
export const mongoConfig: TypeOrmModuleOptions = {
  name: "mongo",
  type: "mongodb",
  host: env.mongoDb.host,
  port: env.mongoDb.port,
  database: env.mongoDb.database,
  useNewUrlParser: true,
  synchronize: true,
  useUnifiedTopology: true,
  logging: true,
  entities: [join(__dirname, "..", "**", "**", "*.entity.{js,ts}")],
};
