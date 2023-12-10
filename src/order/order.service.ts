import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async validateOrderTime(dateTime: Date | string): Promise<void> {
    const orderDate =
      typeof dateTime === 'string' ? new Date(dateTime) : dateTime;

    if (isNaN(orderDate.getTime())) {
      throw new BadRequestException('Invalid date format.');
    }

    const threeHoursAgo = new Date(orderDate.getTime() - 3 * 60 * 60 * 1000);
    const threeHoursLater = new Date(orderDate.getTime() + 3 * 60 * 60 * 1000);

    const conflictingOrder = await this.orderRepository.findOne({
      where: {
        dateTime: Between(threeHoursAgo, threeHoursLater),
      },
    });

    if (conflictingOrder) {
      throw new BadRequestException(
        'An order already exists within 3 hours of the specified time.',
      );
    }
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    await this.validateOrderTime(createOrderDto.dateTime);
    const order = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(order);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    await this.validateOrderTime(updateOrderDto.dateTime || order.dateTime);
    this.orderRepository.merge(order, updateOrderDto);
    return this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['services'] });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: id },
      relations: ['services'],
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.softRemove(order);
  }
}
