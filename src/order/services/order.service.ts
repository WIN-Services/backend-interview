import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import moment from 'moment';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { OrderEntity } from '../models/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}
  //   getHello(): string {
  //     return from(this.orderRepository.save({ name: 'service1' }));
  //   }

  public async getAllOrders(): Promise<any> {
    return await from(this.orderRepository.find());
  }

  public async addOrder(body): Promise<any> {
    return await from(this.orderRepository.save(body));
  }

  public async updateOrder(id, order): Promise<any> {
    const existingOrder = await this.orderRepository.findOne({
      where: { id: id },
    });
    console.log('OrderService ~ addOrder ~ order', existingOrder);

    if (!existingOrder) {
      throw new NotFoundException('Order does not exist');
    }
    const currentTime = new Date().getTime();
    const threeHourEarlierTime = currentTime - 3 * 60 * 60 * 1000;
    const updatedTime = new Date(existingOrder.updatedAt).getTime();
    const updatedTimeToIst = updatedTime + 5.5 * 60 * 60 * 1000;
    if (updatedTimeToIst > threeHourEarlierTime) {
      console.log('inside if');
      throw new ConflictException('Cannot update order before 3 hours');
    }
    return await from(this.orderRepository.update(id, order));
  }

  public async deleteOrder(id): Promise<any> {
    return await from(this.orderRepository.delete({ id }));
  }

  public async getOrderById(id): Promise<any> {
    return await from(this.orderRepository.findOne({ where: { id } }));
  }
  public getHello(): string {
    return 'Hello World!';
  }
}
