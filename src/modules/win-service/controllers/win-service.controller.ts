import { Controller, Get, Query } from '@nestjs/common';
import { WinServiceDataService } from '../services/win-service-data.service';
import { GetWinServicesFilterDto } from '../dtos/get-win-service.dto';

@Controller('service')
export class WinServiceController {
  constructor(private readonly winServiceDataService: WinServiceDataService) {}

  @Get()
  getAllWinServices(@Query() filters: GetWinServicesFilterDto) {
    return this.winServiceDataService.getWinServicesWithFilter(filters);
  }
}
