import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Orders, ordersSchema } from './entities/orders.entity';
import { OrdersRepository } from './order.repository';
import { ProductServiceRepository } from 'src/product-service/product-service.repository';
import { ProductService, productServiceSchema } from 'src/product-service/entities/product-service.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Orders.name, schema: ordersSchema }]),
    MongooseModule.forFeature([{ name: ProductService.name, schema: productServiceSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository, ProductServiceRepository]
})
export class OrdersModule {}
