import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Response } from 'express';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/createOrder')
  async create(@Body() createOrderDto: CreateOrderDto, @Res() res : Response) {
    try{
      const result = await this.ordersService.createOrder(createOrderDto);
      res.status(200).send(result)

    }catch(error){
      res.status(400).send(error)
    }
  }

  @Get('/')
  async findAll( @Res() res : Response) {
    try{
      const result = await this.ordersService.findAllOrders();
      res.status(200).send(result)
    }catch(error){
      res.status(400).send(error)
    }
  }

  @Get('/:id')
  async findOne(@Param('id') id: string,  @Res() res : Response) {
    try{
    const result = await  this.ordersService.findOne(id);
    res.status(200).send(result)
    }catch(error){
      res.status(400).send(error)
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto, @Res() res : Response) {
     try{
      const result =  await this.ordersService.update(id, updateOrderDto);
      res.status(200).send(result)
      }catch(error){
        res.status(400).send(error)
      }

  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res : Response) {
    
    try{
      const result =  await  this.ordersService.remove(id);
      res.status(200).send(result)
      }catch(error){
        res.status(400).send(error)
      }
    
  }
}
