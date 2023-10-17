import { Controller, Get } from '@nestjs/common';
import { CustomerDataService } from '../services/customer-data.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerDataService: CustomerDataService) {}

  @Get()
  getHello(): string {
    return null;
  }
}
