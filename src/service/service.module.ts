import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServiceService } from './services/service.service';
import { ServiceController } from './controllers/service.controller';
import { ServiceEntity } from './models/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity])],
  providers: [ServiceService],
  controllers: [ServiceController],
})
export class ServiceModule {}
