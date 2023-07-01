import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Configs } from './config/config';
import { OrdersModule } from './orders/orders.module';
import { RolesGuard } from './role/role-guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forRoot(Configs().databases.mongo_db.url, {
      dbName: 'oms',
    }),
    OrdersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
