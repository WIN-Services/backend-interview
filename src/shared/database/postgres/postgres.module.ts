import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import { AppConfigService } from '../../config/app-config.service';
import { AppConfigModule } from '../../config/app-config.module';
import { PostgresService } from './postgres.service';

@Module({
  imports: [AppConfigModule],
  providers: [
    {
      provide: 'PG_CONNECTION',
      inject: [AppConfigService],
      useFactory: (config) =>
        new Pool({
          ...config.databaseConfig,
        }),
    },
    PostgresService,
  ],
  exports: [PostgresService],
})
export class PostgresModule {}
