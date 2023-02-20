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
import { orderDto } from '../../dto/orderDto';
import { paramDto } from '../../dto/paramDto';
import { InternalApiGuard } from '../../guards/internal.api.guard';
import { OrderService } from '../services/order.service';

@Controller('/order')
@UseGuards(InternalApiGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // @Get()
  // getHello(): string {
  //   return this.orderService.getHello();
  // }
  @Get()
  public async getAllOrders(): Promise<any> {
    return await this.orderService.getAllOrders();
  }

  @Get(':id')
  public async getOrderById(@Param() param: paramDto): Promise<any> {
    console.log('param', param);
    console.log(typeof param.id);
    return await this.orderService.getOrderById(param.id);
  }

  @Post()
  public async addOrder(@Body() body: orderDto): Promise<any> {
    console.log('bodyyyy', body);
    return await this.orderService.addOrder(body);
  }

  @Put(':id')
  public async updateOrder(
    @Body() body: orderDto,
    @Param() param: paramDto,
  ): Promise<any> {
    console.log(body, param);
    return await this.orderService.updateOrder(param.id, body);
  }

  @Delete(':id')
  public async deleteOrder(@Param() param: paramDto): Promise<any> {
    return await this.orderService.deleteOrder(param.id);
  }
}
