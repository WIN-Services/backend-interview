import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { GetOrderRequestDto } from './dto/request/get-order.dto';
import { UpdateOrderRequestDto } from './dto/request/update-order.dto';
import { DeleteOrderRequestDto } from './dto/request/delete-order.dto';
import { CreateOrderRequestDto } from './dto/request/create-order.dto';

@Controller('api/v1/orders')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // route to get all the orders.
  @Get()
  async getAllOrders() {
    return await this.appService.getAllOrders();
  }

  // route to get order with :id.
  @Get('/:id')
  async getOrder(@Param() param: GetOrderRequestDto) {
    return await this.appService.getOrder(param.id);
  }

  // route to create new order.
  @Post('/create')
  async createOrder(@Body() body: CreateOrderRequestDto) {
    return await this.appService.createOrder(body);
  }

  // route to update existing order.
  @Put()
  async updateOrder(@Body() body: UpdateOrderRequestDto) {
    return await this.appService.updateOrder(body);
  }

  // route to delete order.
  @Delete('/:id')
  async deleteOrder(@Param() param: DeleteOrderRequestDto) {
    return await this.appService.deleteOrder(param.id);
  }

  
}
