import { Module } from '@nestjs/common';
import { OrderModule } from './modules/order/order.module';
import { AppConfigModule } from './shared/config/app-config.module';

@Module({
  imports: [AppConfigModule, OrderModule],
})
export class AppModule {}
