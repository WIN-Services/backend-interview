import { Controller, Get } from '@nestjs/common';
import { OrderDataService } from '../services/order-data.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderDataService: OrderDataService) {}

  @Get()
  getHello(): string {
    return null;
  }
}
