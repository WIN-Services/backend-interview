import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ServiceRecordsService } from './service-records.service';
import { CreateServiceRecordDto } from './dto/create-service-record.dto';
import { UpdateServiceRecordDto } from './dto/update-service-record.dto';

@Controller('api/v1/service-record')
export class ServiceRecordsController {
  constructor(private readonly serviceRecordsService: ServiceRecordsService) {}

  @Post()
  createServiceRecord(@Body() createServiceRecordDto: CreateServiceRecordDto) {
    return this.serviceRecordsService.createServiceRecord(
      createServiceRecordDto,
    );
  }

  @Get()
  getAllServiceRecords() {
    return this.serviceRecordsService.getAllServiceRecords();
  }

  @Get(':id')
  getServiceRecord(@Param() param: { id: string }) {
    return this.serviceRecordsService.getServiceRecord(param);
  }

  @Put(':id')
  updateServiceRecord(
    @Param() param: { id: string },
    @Body() updateServiceRecordDto: UpdateServiceRecordDto,
  ) {
    return this.serviceRecordsService.updateServiceRecord(
      param,
      updateServiceRecordDto,
    );
  }

  @Delete(':id')
  async removeServiceRecord(@Param() param: { id: string }) {
    return await this.serviceRecordsService.removeServiceRecord(param);
  }
}
