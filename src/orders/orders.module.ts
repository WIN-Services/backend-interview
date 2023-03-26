import {Module} from '@nestjs/common';
import {OrdersService} from './services/orders.service';
import {OrdersController} from './controllers/orders.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {OrderEntity} from './entities/order.entity';

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity])],
    controllers: [OrdersController],
    providers: [OrdersService]
})
export class OrdersModule {
}
