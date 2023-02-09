import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { paramDto } from '../../dto/paramDto';
import { serviceDto } from '../../dto/serviceRecordDto';
import { InternalApiGuard } from '../../guards/internal.api.guard';
import { ServiceService } from '../services/service.service';

@Controller('/service')
@UseGuards(InternalApiGuard)
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  public async getAllServices(): Promise<any> {
    return await this.serviceService.getAllServices();
  }

  @Get(':id')
  public async getServiceById(@Param() param: paramDto): Promise<any> {
    return await this.serviceService.getServiceById(param.id);
  }

  @Post()
  public async addService(@Body() body: serviceDto): Promise<any> {
    return await this.serviceService.addService(body);
  }

  @Put(':id')
  public async updateService(
    @Body() body: serviceDto,
    @Param() param: paramDto,
  ): Promise<any> {
    return await this.serviceService.updateService(param.id, body);
  }

  @Delete(':id')
  public async deleteService(@Param() param: paramDto): Promise<any> {
    return await this.serviceService.deleteService(param.id);
  }
}
