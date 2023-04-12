import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AppInterceptor } from 'src/app.interceptor';
import { Public } from 'src/common/decorators';
import { Utility } from 'src/utils/utility';
import { Logger } from 'winston';
import { ServicesService } from '../services/services.service';

@UseInterceptors(AppInterceptor)
@Controller()
@Public()
export class ServicesController {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
    private services: ServicesService,
    private utilityService: Utility,
  ) {}
  @Post()
  public saveServices(@Body() body: any): Promise<any> {
    return this.services.save(body);
  }
  @Get()
  public getAllServices(@Query() queryParam: any): Promise<any> {
    const { skip, limit, page } = this.utilityService.getPagination(
      queryParam.page,
      queryParam.pageSize,
    );
    return this.services.findByPagnation(skip, limit, page);
  }
  @Put('/:serviceId')
  public updateOrderService(
    @Body() body: any,
    @Param('serviceId') serviceId: string,
  ): Promise<any> {
    return this.services.updateByServiceId(body, serviceId);
  }
  @Delete('/:serviceId')
  public async deleteOrderService(
    @Param('serviceId') serviceId: string,
  ): Promise<any> {
    const data = await this.services.deleteByServiceId(serviceId);
    return data;
  }
}
