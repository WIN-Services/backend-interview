import dotenv from "dotenv";
dotenv.config();
const { env } = process;
export default {
  PORT: env.PORT,
  MONGO_URL: env.MONGO_URL,
};
