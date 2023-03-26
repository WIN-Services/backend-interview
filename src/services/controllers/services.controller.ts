import {Controller, Get, Post, Body, Put, Param, Delete, UseGuards} from '@nestjs/common';
import {ServicesService} from '../services/services.service';
import {CreateServiceDto} from '../dto/create-service.dto';
import {UpdateServiceDto} from '../dto/update-service.dto';
import {InternalApiGuard} from "../../guards/internal.api.guard";

@Controller('services')
@UseGuards(InternalApiGuard)
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {
    }

    @Post()
    public async addService(@Body() createServiceDto: CreateServiceDto) {
        return await this.servicesService.addService(createServiceDto);
    }

    @Get()
    public async getAllServices() {
        return await this.servicesService.getAllServices();
    }

    @Get(':id')
    public async getServiceById(@Param() param: UpdateServiceDto) {
        return await this.servicesService.getServiceById(param.id);
    }

    @Put(':id')
    public async updateServiceById(@Param() param: UpdateServiceDto, @Body() body: CreateServiceDto): Promise<any> {
        return await this.servicesService.updateServiceById(param.id, body);
    }

    @Delete(':id')
    public async deleteServiceById(@Param() param: UpdateServiceDto) {
        return this.servicesService.deleteServiceById(param.id);
    }
}
