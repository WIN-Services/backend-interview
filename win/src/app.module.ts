import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [OrdersModule, ServicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
