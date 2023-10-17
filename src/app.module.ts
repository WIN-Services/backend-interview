import { Module } from '@nestjs/common';
import { OrderModule } from './modules/order/order.module';
import { AppConfigModule } from './shared/config/app-config.module';
import { WinServiceModule } from './modules/win-service/win-service.module';
import { CustomerModule } from './modules/customer/customer.module';

@Module({
  imports: [AppConfigModule, OrderModule, WinServiceModule, CustomerModule],
})
export class AppModule {}
