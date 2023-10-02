// order.module.ts
import {Module} from '@nestjs/common';
import {OrderController} from './order.controller';
import {OrderService} from './order.service';
import {SequelizeModule} from '@nestjs/sequelize';
import {Order} from './order.model';
import {ServiceRecord} from "./service-record.model";
import {OrderServiceRecord} from "./order-service-record.model";

@Module({
    imports: [SequelizeModule.forFeature([Order, ServiceRecord, OrderServiceRecord])],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {
}
