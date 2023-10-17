import { Body, Controller, Post } from '@nestjs/common';
import { OrderDataService } from '../services/order-data.service';
import { CreateNewOrderDto } from '../dtos/create-new-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderDataService: OrderDataService) {}

  @Post()
  createNewOrder(@Body() body: CreateNewOrderDto) {
    return this.orderDataService.createOrder(body);
  }
}
