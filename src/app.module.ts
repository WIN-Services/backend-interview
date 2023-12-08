import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/database.config';
import { ServiceProductsModule } from './service-products/service-products.module';
import { OrderModule } from './orders/orders.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ServiceProductsModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
