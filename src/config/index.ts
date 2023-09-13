import dotenv from 'dotenv';

dotenv.config();

export const config = {
  db_user: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
  db_host: process.env.DB_HOST,
  db_port: process.env.DB_PORT ?? '5432',
  database: process.env.DATABASE,
  port: process.env.PORT ?? '3000',
};
