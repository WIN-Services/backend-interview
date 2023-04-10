import dotenv from "dotenv";
dotenv.config();

const development = {
  name: "development",
  db_url: process.env.MONGO_DEV_URL,
};

const production = {
  name: "production",
  db_url: process.env.MONGO_PROD_URL,
};

export default eval(process.env.NODE_ENV) == undefined
  ? development
  : eval(process.env.NODE_ENV);
