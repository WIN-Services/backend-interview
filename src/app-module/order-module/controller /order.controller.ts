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
import { OrderService } from '../services/order.service';

@UseInterceptors(AppInterceptor)
@Controller()
@Public()
export class OrderController {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
    private orderService: OrderService,
    private utilityService: Utility,
  ) {}
  @Post()
  public saveOrder(@Body() body: any): Promise<any> {
    return this.orderService.save(body);
  }
  @Get()
  public getAllOrders(@Query() queryParam: any): Promise<any> {
    const { skip, limit, page } = this.utilityService.getPagination(
      queryParam.page,
      queryParam.pageSize,
    );
    return this.orderService.findByPagnation(skip, limit, page, undefined);
  }
  @Get('/:userId')
  public getOrderByUserId(
    @Param('userId') userId: string,
    @Query() queryParam: any,
  ): Promise<any> {
    const { skip, limit, page } = this.utilityService.getPagination(
      queryParam.page,
      queryParam.pageSize,
    );
    return this.orderService.findByPagnation(skip, limit, page, userId);
  }
  @Public()
  @Put('/:orderId')
  public updateOrder(
    @Body() body: any,
    @Param('orderId') orderId: string,
  ): Promise<any> {
    return this.orderService.updateByOrderId(body, orderId);
  }
  @Delete('/:orderId')
  public async deleteOrder(@Param('orderId') orderId: string): Promise<any> {
    const data = await this.orderService.deleteByOrderId(orderId);
    return data;
  }
}
