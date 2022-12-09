import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Service } from './entities/service.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Order, Service])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
