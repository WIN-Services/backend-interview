import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Roles } from 'src/role/role-decorators';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/role/role-guard';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/create')
  @Roles(Role.PUBLIC)
  @ApiHeader({
    name: 'Authorization',
    description: 'Admin token needed',
  })
  @ApiOperation({
    summary: "Create order",
    description: "create order Description"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'order has been successfully created',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({
    status: HttpStatus.PRECONDITION_FAILED,
    description: 'Failed Precondition.',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'The order already exist with this name',
  })
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.placeOrder(createOrderDto);
  }

  @Get('/all')
  @Roles(Role.ADMIN)
  @ApiHeader({
    name: 'Authorization',
    description: 'Admin token needed',
  })
  @ApiOperation({
    summary: "All Orders",
    description: "List all Orders Description"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The Orders has been successfully listed',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({
    status: HttpStatus.PRECONDITION_FAILED,
    description: 'Failed Precondition.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Orders not found',
  })
  listAllOrders(@Query('page') page: number,
  @Query('page_size') page_size: number) {
    return this.ordersService.listAllOrders(page, page_size);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiHeader({
    name: 'Authorization',
    description: 'Admin token needed',
  })
  @ApiOperation({
    summary: "Get Order By Id",
    description: "Get Order By Id Description"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The Orders has been successfully found',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({
    status: HttpStatus.PRECONDITION_FAILED,
    description: 'Failed Precondition.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Orders not found',
  })
  getOrderById(@Param('id') id: string) {
    return this.ordersService.getOrderById(id);
  }

  @Patch('/update/:id')
  @Roles(Role.PUBLIC)
  @ApiHeader({
    name: 'Authorization',
    description: 'Admin token needed',
  })
  @ApiOperation({
    summary: "Update Order By Id",
    description: "Update Order By Id Description"
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'The Orders has been successfully updated',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({
    status: HttpStatus.PRECONDITION_FAILED,
    description: 'Failed Precondition.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Order not found',
  })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.updateOrderById(id, updateOrderDto);
  }

  @Delete('/delete/:id')
  @Roles(Role.ADMIN)
  @ApiHeader({
    name: 'Authorization',
    description: 'Admin token needed',
  })
  @ApiOperation({
    summary: "Delete Order By Id",
    description: "Delete Order By Id Description"
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'The Orders has been successfully deleted',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({
    status: HttpStatus.PRECONDITION_FAILED,
    description: 'Failed Precondition.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Order not found',
  })
  remove(@Param('id') id: string) {
    return this.ordersService.deleteOrderById(id);
  }
}
