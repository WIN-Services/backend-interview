import { Controller, Get, Param, Put, Body, Post, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Orders } from '../ententies/orders.entity';
import { OrderService } from '../services/order.service';
import { CreateOrder } from '../validators/createOrder.dto';
import { GetSingleOrder } from '../validators/getSingleOrder.dto';
import { RemoveOrder } from '../validators/removeOrder.dto';
import { UpdateOrder } from '../validators/updateOrder.dto';

@ApiTags('orders')
@Controller('/orders')
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders() {
    return await this.orderService.findAllOrders();
  }

  @Get('/:id')
  async getSingleOrder(@Param() params: GetSingleOrder) {
    return await this.orderService.findOneOrder(params.id);
  }

  @Post('')
  async createOrder(@Body() order: CreateOrder) {
    return await this.orderService.createOrder(order as Orders);
  }

  @Put('')
  async updateOrder(@Body() order: UpdateOrder) {
    return await this.orderService.updateOrder(order);
  }

  @Delete('/:id')
  async deleteOrder(@Param() params: RemoveOrder) {
    return await this.orderService.removeOrder(params.id)
  }
  
}
