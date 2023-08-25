import { Module } from '@nestjs/common';
import { OrdersModule } from './modules/orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app-config';
import dbConfig from './config/database-config';
import { DatabaseModule } from './database/database.module';
import { ServiceRecordsModule } from './modules/service-records/service-records.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env`,
      isGlobal: true,
      load: [appConfig, dbConfig],
    }),
    DatabaseModule,
    OrdersModule,
    ServiceRecordsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
