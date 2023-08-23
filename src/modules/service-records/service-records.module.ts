import { Module } from '@nestjs/common';
import { ServiceRecordsService } from './service-records.service';
import { ServiceRecordsController } from './service-records.controller';

@Module({
  controllers: [ServiceRecordsController],
  providers: [ServiceRecordsService],
})
export class ServiceRecordsModule {}
