import { Module } from '@nestjs/common';
import { OrderModule } from './modules/order/order.module';
import { AppConfigModule } from './shared/config/app-config.module';
import { WinServiceModule } from './modules/win-service/win-service.module';

@Module({
  imports: [AppConfigModule, OrderModule, WinServiceModule],
})
export class AppModule {}
