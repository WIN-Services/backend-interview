import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';
import { ServiceRecordModule } from './service-record/service-record.module';
import { ServiceRecord } from './service-record/entities/service-record.entity';
import { Order } from './order/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'gagansoni',
      password: 'roots',
      database: 'letter',
      entities: [ServiceRecord, Order],
      synchronize: true,
    }),
    OrderModule,
    ServiceRecordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
