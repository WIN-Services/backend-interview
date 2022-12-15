import dotenv from "dotenv";

dotenv.config({path: ".env"}); // Required

export = {
  development: {
    username                 : process.env.MYSQL_USER,
    password                 : process.env.MYSQL_PASSWORD,
    database                 : process.env.MYSQL_DB,
    host                     : process.env.MYSQL_HOSTNAME,
    dialect                  : "mysql",
    migrationStorageTableName: "sequelize_meta"
  }
};