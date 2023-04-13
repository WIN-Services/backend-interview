import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { Configs } from './config/config';
import { HealthModule } from './health/health.module';
import { RolesGuard } from './role/role-guard';
import { OmsModule } from './oms/oms.module';

@Module({
  imports: [
    MongooseModule.forRoot(Configs().databases.mongo_db.url, {
      dbName: 'win_oms',
    }),
    OmsModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
