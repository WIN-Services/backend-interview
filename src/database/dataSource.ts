import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  port: 5433,
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'win',
  entities: ['dist/**/entities/*.js'],
  migrations: ['dist/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
