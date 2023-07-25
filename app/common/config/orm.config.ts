import { DataSource, DataSourceOptions } from 'typeorm';
import * as entities from '../entities/index';

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  entities: Object.values(entities),
  synchronize: true,
  logging: true,
};

export const dataSource = new DataSource(config);
