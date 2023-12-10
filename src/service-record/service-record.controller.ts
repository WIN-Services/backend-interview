import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServiceRecordService } from './service-record.service';
import { CreateServiceRecordDto } from './dto/create-service-record.dto';
import { UpdateServiceRecordDto } from './dto/update-service-record.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { ServiceRecord } from './entities/service-record.entity';

@ApiTags('service-record')
@Controller('service-record')
export class ServiceRecordController {
  constructor(private readonly serviceRecordService: ServiceRecordService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new service record' })
  @ApiResponse({
    status: 201,
    description: 'The service record has been successfully created.',
    type: ServiceRecord,
  })
  @ApiBody({ type: CreateServiceRecordDto })
  create(@Body() createServiceRecordDto: CreateServiceRecordDto) {
    return this.serviceRecordService.create(createServiceRecordDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all service records' })
  @ApiResponse({
    status: 200,
    description: 'List of all service records',
    type: [ServiceRecord],
  })
  findAll() {
    return this.serviceRecordService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a service record by ID' })
  @ApiResponse({
    status: 200,
    description: 'The service record details',
    type: ServiceRecord,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the service record to retrieve',
    type: 'number',
  })
  findOne(@Param('id') id: string) {
    return this.serviceRecordService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a service record' })
  @ApiResponse({
    status: 200,
    description: 'The updated service record details',
    type: ServiceRecord,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the service record to update',
    type: 'number',
  })
  @ApiBody({ type: UpdateServiceRecordDto })
  update(
    @Param('id') id: string,
    @Body() updateServiceRecordDto: UpdateServiceRecordDto,
  ) {
    return this.serviceRecordService.update(+id, updateServiceRecordDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a service record' })
  @ApiResponse({
    status: 200,
    description: 'The service record has been successfully deleted',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the service record to delete',
    type: 'number',
  })
  remove(@Param('id') id: string) {
    return this.serviceRecordService.remove(+id);
  }
}
