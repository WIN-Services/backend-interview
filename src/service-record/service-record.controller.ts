// service-record.controller.ts
import {Controller, Get, Post, Put, Delete, Body, Param} from '@nestjs/common';
import {ServiceRecordService} from './service-record.service';
import {ServiceRecord} from "../order/service-record.model";

@Controller('services')
export class ServiceRecordController {
    constructor(private readonly serviceRecordService: ServiceRecordService) {
    }

    @Get()
    async getAllServices() {
        return this.serviceRecordService.getAllServices();
    }

    @Post()
    async createService(@Body() createServiceDto: ServiceRecord) {
        return this.serviceRecordService.createService(createServiceDto);
    }

}
