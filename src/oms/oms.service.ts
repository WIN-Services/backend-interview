import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { OrderDocument, OrderEntity } from './entity/order.entity';
import { CreateOrderRequestDto } from './dto/create-order.dto';
import { UpdateOrderRequestDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @InjectModel(OrderEntity.name)
    private requestModel: Model<OrderDocument>,
  ) {}

  async createOrder(header, createOrderRequestDto: CreateOrderRequestDto):Promise<OrderEntity> {
      return null
  }
  async getOrderById(header, id: String): Promise<OrderEntity> {return  null}
  async getAllOrders(header, id: string): Promise<OrderEntity[]> {return null;}
  async updateOrder(
    header,
    updaterOrderRequestDto: UpdateOrderRequestDto,
  ): Promise<OrderEntity> {
    return null;
  }
  async deleteOrder(header, id: string) {}
}
