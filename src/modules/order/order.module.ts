import { Module } from '@nestjs/common';
import { OrderController } from './controllers/order.controller';
import { OrderDataService } from './services/order-data.service';
import { PostgresModule } from '../../shared/database/postgres/postgres.module';

@Module({
  imports: [PostgresModule],
  controllers: [OrderController],
  providers: [OrderDataService],
})
export class OrderModule {}
