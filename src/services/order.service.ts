import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ORDERS } from '../enums/enums';
import { Repository } from 'typeorm';
import { Orders } from '../ententies/orders.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
  ) { }

  async createOrder(order: Orders): Promise<Orders> {
    const savedOrder = await this.ordersRepository.save(order)
    return savedOrder;
  }

  async updateOrder(order: Partial<Orders>): Promise<string> {
    await this.ordersRepository.update({ id: order.id }, order);
    return ORDERS.Update;
  }
  
  async findAllOrders(): Promise<Orders[]> {
    return this.ordersRepository.find();
  }

  async findOneOrder(id: number): Promise<Orders> {
    const order = await this.ordersRepository.findOneBy({ id});
    if(order) return order;
    else throw new HttpException(ORDERS.NotFount, HttpStatus.NOT_FOUND);
  }

  async removeOrder(id: number): Promise<string> {
    await this.ordersRepository.delete(id);
    return ORDERS.Remove;
  }

}
