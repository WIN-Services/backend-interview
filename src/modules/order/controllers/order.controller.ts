import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderDataService } from '../services/order-data.service';
import { CreateNewOrderDto } from '../dtos/create-new-order.dto';
import {
  UpdateOrderBodyDto,
  UpdateOrderQueryDto,
} from '../dtos/update-order.dto';
import { DeleteOrderQueryDto } from '../dtos/delete-order.dto';
import { GetOrderQueryDto } from '../dtos/get-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderDataService: OrderDataService) {}

  @Post()
  createNewOrder(@Body() body: CreateNewOrderDto) {
    return this.orderDataService.createOrder(body);
  }

  @Get('all')
  getAllOrders() {
    return this.orderDataService.getAllOrders();
  }

  @Get(':orderId')
  getOrder(@Param() { orderId }: GetOrderQueryDto) {
    return this.orderDataService.getOrder({ orderId });
  }

  @Put(':orderId')
  updateOrder(
    @Param() { orderId }: UpdateOrderQueryDto,
    @Body() body: UpdateOrderBodyDto,
  ) {
    return this.orderDataService.updateOrder({
      orderId,
      ...body,
    });
  }

  @Delete(':orderId')
  deleteOrder(@Param() { orderId }: DeleteOrderQueryDto) {
    return this.orderDataService.deleteOrder({ orderId });
  }
}
