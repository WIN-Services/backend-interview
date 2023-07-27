import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.APP_DB_TYPE,
  host: process.env.APP_DB_HOST,
  port: parseInt(process.env.APP_DB_PORT),
  database: process.env.APP_DB_NAME,
  username: process.env.APP_DB_USERNAME,
  password: process.env.APP_DB_PASSWORD,
  synchronize: process.env.APP_DB_SYNCHRONIZE,
  maxConnections: parseInt(process.env.APP_DB_MAXCONNECTIONS),
}));
