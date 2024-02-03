import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "Node" as string,
  "root" as string,
  "password",

  {
    host: "localhost",
    dialect: "mysql",
    retry: {
      match: [
        /ETIMEDOUT/,
        /EHOSTUNREACH/,
        /ECONNRESET/,
        /ECONNREFUSED/,
        /ETIMEDOUT/,
        /ESOCKETTIMEDOUT/,
        /EHOSTUNREACH/,
        /EPIPE/,
        /EAI_AGAIN/,
        /SequelizeConnectionError/,
        /SequelizeConnectionRefusedError/,
        /SequelizeHostNotFoundError/,
        /SequelizeHostNotReachableError/,
        /SequelizeInvalidConnectionError/,
        /SequelizeConnectionTimedOutError/,
      ],
      max: 5,
    },
    pool: {
      max: 15,
      min: 1,
      idle: 20000,
      evict: 15000,
      acquire: 30000,
    },
  }
);

try {
  sequelize.authenticate();
  console.log("database connected");
  //   .then(() => {
  //     console.log("Info -Database connected successfully");
  //   })
  //   .catch((err) => {
  //     console.info("Error -unable to connect databse", err);
  //   });
  // console.log(connectionLog, "--------");
} catch (err: any) {
  console.log(err);
}

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("All Models synced succesfully:");
  })
  .catch((error) => {
    console.log("Error syncing db models: ", error);
  });

export default sequelize;
sequelize.authenticate();
