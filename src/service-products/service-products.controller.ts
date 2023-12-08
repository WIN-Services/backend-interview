import { Body, Controller, Get, Param, Patch, Post, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { ServiceProductService } from "./service-products.service";
import { ServiceProductCreateDTO } from "./dtos/create-service-product.dto";

@Controller('service-product')
export class ServiceProductController {
    constructor(private serviceProductService: ServiceProductService) { }

    @Post('/')
    @UsePipes(ValidationPipe)
    async create(@Body() body: ServiceProductCreateDTO) {
        return await this.serviceProductService.create(body)
    }

    @Get('/:id')
    async getOne(@Param('id') id: string) {
        return await this.serviceProductService.get({ where: { id } })
    }

    @Get('/')
    async get() {
        return await this.serviceProductService.get()
    }

    @Patch('/:id')
    @UsePipes(ValidationPipe)
    async update(@Body() body, @Param('id') id: string) {
        return await this.serviceProductService.update(body, id)
    }

    @Patch('/:id')
    @UsePipes(ValidationPipe)
    async delete(@Param('id') id: string) {
        return await this.serviceProductService.delete(id)
    }
}