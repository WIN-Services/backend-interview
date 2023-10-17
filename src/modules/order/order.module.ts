import { Module } from '@nestjs/common';
import { OrderController } from './controllers/order.controller';
import { OrderDataService } from './services/order-data.service';
import { PostgresModule } from '../../shared/database/postgres/postgres.module';
import { WinServiceModule } from '../win-service/win-service.module';

@Module({
  imports: [PostgresModule, WinServiceModule],
  controllers: [OrderController],
  providers: [OrderDataService],
})
export class OrderModule {}
