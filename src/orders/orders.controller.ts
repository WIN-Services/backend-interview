import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/role/role-decorators';
import { Role } from 'src/role/role-guard';

@ApiTags('oms')
@Controller('order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles(Role.USER)
  @Post()
  @ApiBearerAuth()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create(createOrderDto);
  }

  @Get('all')
  @Roles(Role.USER)
  @ApiBearerAuth()
  async findAll(
    @Query('page') page: number,
    @Query('page_size') page_size: number,
  ) {
    return await this.ordersService.findAll(page, page_size);
  }

  @Get(':id')
  @Roles(Role.USER)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.USER)
  @ApiBearerAuth()
  async update(@Body() updateOrderDto: UpdateOrderDto) {
    return await this.ordersService.update(updateOrderDto);
  }

  @Delete(':id')
  @Roles(Role.USER)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    return await this.ordersService.remove(id);
  }
}
