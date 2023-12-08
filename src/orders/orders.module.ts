import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersEntity } from "./entities/orders.entity";
import { OrderService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { ServiceProductsModule } from "src/service-products/service-products.module";

@Module({
    imports: [ServiceProductsModule, TypeOrmModule.forFeature([OrdersEntity])],
    controllers: [OrdersController],
    providers: [OrderService]
})
export class OrderModule { }