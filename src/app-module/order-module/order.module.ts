import { Module } from '@nestjs/common';
import { env } from 'src/env';
import { JwtModule } from '@nestjs/jwt';
import { OrderController } from './controller /order.controller';
import { OrderService } from './services/order.service';
import { OrderRepository } from './repository/order.repository';
import { Utility } from 'src/utils/utility';
import { UserModule } from '../user-module/user.module';
@Module({
  imports: [JwtModule.register({ secret: env.jwt.accessKey }), UserModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, Utility],
  exports: [OrderService, OrderRepository, Utility],
})
export class OrderModule {}
