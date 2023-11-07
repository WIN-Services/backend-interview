import { Sequelize } from "sequelize";
import dbConfig from "../config/db.config";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: "mysql",
  logging: false,
  timezone: "+00:00",
  pool: dbConfig.pool,
  port: +dbConfig.PORT,
});
sequelize.sync();
sequelize.authenticate().then(function (errors: any) {
  console.log(errors);
});
export default sequelize;
