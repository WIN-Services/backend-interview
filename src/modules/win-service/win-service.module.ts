import { Module } from '@nestjs/common';
import { PostgresModule } from '../../shared/database/postgres/postgres.module';
import { WinServiceController } from './controllers/win-service.controller';
import { WinServiceDataService } from './services/win-service-data.service';

@Module({
  imports: [PostgresModule],
  controllers: [WinServiceController],
  providers: [WinServiceDataService],
  exports: [WinServiceDataService],
})
export class WinServiceModule {}
