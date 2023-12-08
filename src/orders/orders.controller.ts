import { Body, Controller, Get, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { OrderService } from "./orders.service";
import { CreateOrderDTO } from "./dtos/create-order.dto";

@Controller('orders')
export class OrdersController {
    constructor(private orderService: OrderService) { }

    @Post('/')
    @UsePipes(ValidationPipe)
    async create(@Body() order: CreateOrderDTO) {
        return await this.orderService.create(order)
    }

    @Get('/')
    async get() {
        return await this.orderService.get()
    }

    @Patch('/:id')
    @UsePipes(ValidationPipe)
    async update(@Body() data, @Param('id') id: string) {
        return await this.orderService.update(data, id)
    }

    @Patch('/:id')
    @UsePipes(ValidationPipe)
    async delete(@Param('id') id: string) {
        return await this.orderService.delete(id)
    }
}