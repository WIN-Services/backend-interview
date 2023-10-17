import { Controller, Get } from '@nestjs/common';
import { WinServiceDataService } from '../services/win-service-data.service';

@Controller('order')
export class WinServiceController {
  constructor(private readonly winServiceDataService: WinServiceDataService) {}

  @Get()
  getHello(): string {
    return null;
  }
}
