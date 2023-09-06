import { Module } from '@nestjs/common';
import { OrderEntity, OrderSchema } from './entity/order.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './oms.controller';
import { OrderService } from './oms.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderEntity.name, schema: OrderSchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OmsModule {}