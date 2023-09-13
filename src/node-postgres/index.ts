import { Pool } from 'pg';
import { config } from '../config/index';

export const pool = new Pool({
  user: config.db_user,
  host: config.db_host,
  database: config.database,
  password: config.db_password,
  port: Number(config.db_port),
});
