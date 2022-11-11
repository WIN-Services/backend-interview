import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './controllers/orders.controller';
import { OrderService } from './services/order.service';
import { Orders } from './ententies/orders.entity';
import { Services } from './ententies/services.entity';
import { ServicesService } from './services/services.service';
import { ServicesController } from './controllers/services.controller';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Orders, Services]),
    
  ],
  controllers: [OrdersController, ServicesController],
  providers: [OrderService, ServicesService],
})
export class AppModule { }
