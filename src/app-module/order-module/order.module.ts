import { Module } from "@nestjs/common";
import { env } from "src/env";
import { JwtModule } from "@nestjs/jwt";
import { OrderController } from "./controller /order.controller";
import { OrderService } from "./services/order.service";
import { MongooseModule } from "@nestjs/mongoose";
import { OrderSchema } from "./entities/order.entity";
import { OrderRepository } from "./repository/order.repository";
import { Utility } from "src/utils/utility";
import { UserModule } from "../user-module/user.module";
@Module({
  imports: [
    JwtModule.register({ secret: env.jwt.accessKey }),
    MongooseModule.forFeature([{ name: "Order", schema: OrderSchema }]),
    UserModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, Utility],
  exports: [OrderService, OrderRepository, Utility],
})
export class OrderModule {}
