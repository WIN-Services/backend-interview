import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TlsOptions } from 'tls';
const dotenv = require('dotenv');
dotenv.config();

const sslEnv: string = process.env.DATABASE_SSL;
if (sslEnv) {
  sslEnv == 'true' || sslEnv == 'false'
    ? Boolean(sslEnv)
    : (sslEnv as TlsOptions);
}
let typeOrmConfig: TypeOrmModuleOptions;
let ssl = false;
if (process.env.ENV !== 'test') {
  typeOrmConfig = {
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'winhome',
    ssl: ssl,
    entities: [
      __dirname + './../**/*.entity.ts',
    ],
    synchronize: true,
    autoLoadEntities: true,
    logging: true
  };
} else if (process.env.ENV === 'test') {
  typeOrmConfig = {
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'winhometest',
    ssl: false,
    entities: [
      __dirname + '/../../**/*.entity.ts',
      __dirname + './../**/*.entities.ts',
    ],
    synchronize: true,
  }
}

export default typeOrmConfig;
