import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Services } from '../ententies/services.entity';
import { ServicesService } from '../services/services.service';
import { CreateService } from '../validators/createService.dto';
import { GetSingleService } from '../validators/getSingleService.dto';
import { RemoveService } from '../validators/removeService.dto';
import { UpdateService } from '../validators/updateService.dto';

@ApiTags('services')
@Controller('/services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async getAllServices() {
    return await this.servicesService.findAllServices();
  }

  @Get('/:id')
  async getSingleService(@Param() params: GetSingleService) {
    return await this.servicesService.findOneService(params.id);
  }

  @Post('')
  async createService(@Body() service: CreateService) {
    return await this.servicesService.createService(service as Services);
  }

  @Put('')
  async updateService(@Body() service: UpdateService) {
    return await this.servicesService.updateService(service);
  }

  @Delete('/:id')
  async deleteService(@Param() params: RemoveService) {
    return await this.servicesService.removeService(params.id)
  }
  
}
