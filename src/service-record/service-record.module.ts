import { Module } from '@nestjs/common';
import { ServiceRecordService } from './service-record.service';
import { ServiceRecordController } from './service-record.controller';
import { ServiceRecord } from './entities/service-record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceRecord])],
  controllers: [ServiceRecordController],
  providers: [ServiceRecordService],
})
export class ServiceRecordModule {}
