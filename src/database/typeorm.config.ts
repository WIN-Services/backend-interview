import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const postGresConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'mydatabase',
  synchronize: true,
  entities: [join(__dirname, '..', '**', '**', '*.entity.{js,ts}')],
};
