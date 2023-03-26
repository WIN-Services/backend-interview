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
import {CreateOrderDto} from "../dto/create-order.dto";
import {UpdateOrderDto} from "../dto/update-order.dto";
import {InternalApiGuard} from '../../guards/internal.api.guard';
import {OrdersService} from "../services/orders.service";

@Controller('orders')
@UseGuards(InternalApiGuard)
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {
    }

    @Get()
    public async getAllOrders(): Promise<any> {
        return await this.ordersService.getAllOrders();
    }

    @Get(':id')
    public async getOrderById(@Param() param: UpdateOrderDto): Promise<any> {
        return await this.ordersService.getOrderById(param.id);
    }

    @Post()
    public async addOrder(@Body() body: CreateOrderDto): Promise<any> {
        return await this.ordersService.addOrder(body);
    }

    @Put(':id')
    public async updateOrder(
        @Body() body: CreateOrderDto,
        @Param() param: UpdateOrderDto,
    ): Promise<any> {
        return await this.ordersService.updateOrder(param.id, body);
    }

    @Delete(':id')
    public async deleteOrder(@Param() param: UpdateOrderDto): Promise<any> {
        return await this.ordersService.deleteOrder(param.id);
    }
}