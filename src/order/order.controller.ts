import {Controller, Get, Post, Put, Delete, Param, Body} from '@nestjs/common';
import {OrderService} from './order.service';
import {Order} from './order.model';
import {CreateOrderDto} from "./dto/create-order.dto";
import {UpdateOrderDto} from "./dto/update-order.dto";

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {
    }

    @Get()
    getAllOrders(): Promise<Order[]> {
        return this.orderService.getAllOrders();
    }

    @Get(':id')
    getOrderById(@Param('id') id: string): Promise<Order> {
        return this.orderService.getOrderById(id);
    }

    @Post()
    createOrder(@Body() order: CreateOrderDto): Promise<Order> {
        return this.orderService.createOrder(order);
    }

    @Put(':id')
    updateOrder(@Param('id') id: string, @Body() order: UpdateOrderDto): Promise<Order> {
        return this.orderService.updateOrder(+id, order);
    }

    @Delete(':id')
    deleteOrder(@Param('id') id: string): Promise<void> {
        return this.orderService.deleteOrder(+id);
    }
}
