import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('api/v1/order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.createOrder(createOrderDto);
  }

  @Get()
  async getAllOrders() {
    return await this.ordersService.getAllOrders();
  }

  @Get(':id')
  async getOrder(@Param() param: { id: string }) {
    return await this.ordersService.getOrder(param);
  }

  @Put(':id')
  async updateOrder(
    @Param() param: { id: string },
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.ordersService.updateOrder(param, updateOrderDto);
  }

  @Delete(':id')
  async removeOrder(@Param() param: { id: string }) {
    return await this.ordersService.removeOrder(param);
  }
}
