import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';
import { CustomerDataService } from './services/customer-data.service';
import { PostgresModule } from '../../shared/database/postgres/postgres.module';

@Module({
  imports: [PostgresModule],
  controllers: [CustomerController],
  providers: [CustomerDataService],
})
export class CustomerModule {}
