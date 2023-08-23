import { Global, Logger, Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { Pool } from 'pg';
import { DatabaseService } from './database.service';

const databasePoolFactory = async (configService: ConfigService) => {
  return new Pool({
    user: configService.get<string>('user'),
    host: configService.get<string>('host'),
    database: configService.get<string>('database'),
    password: configService.get<string>('password'),
    port: configService.get<number>('db_port'),
  });
};

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE_POOL',
      inject: [ConfigService],
      useFactory: databasePoolFactory,
    },
    DatabaseService,
  ],
  exports: [DatabaseService],
})
export class DatabaseModule implements OnApplicationShutdown {
  private readonly logger = new Logger(DatabaseModule.name);

  constructor(private readonly moduleRef: ModuleRef) {}

  onApplicationShutdown(signal?: string): any {
    this.logger.log(`Shutting down on signal ${signal}`);
    const pool = this.moduleRef.get('DATABASE_POOL') as Pool;
    return pool.end();
  }
}
