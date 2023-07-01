import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Configs } from './config/config';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    MongooseModule.forRoot(Configs().databases.mongo_db.url, {
      dbName: 'oms',
    }),
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
