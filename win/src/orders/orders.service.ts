import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { In } from 'typeorm';
import * as moment from 'moment';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Service } from '../services/entities/service.entity';

const MAX_ORDER_EDITABLE_HOURS = 3;

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { services } = createOrderDto;
    const servicesEntities = await this.serviceRepository.findBy({
      id: In(services),
    });

    if (servicesEntities.length !== services.length) {
      throw new HttpException('Service not found', HttpStatus.BAD_REQUEST);
    }

    const order = this.orderRepository.create({
      ...createOrderDto,
      services: servicesEntities,
      id: uuidv4(),
      datetime: new Date(),
    });
    return this.orderRepository.save(order);
  }

  findAll() {
    return this.orderRepository.find({ relations: ['services'] });
  }

  findOne(id: string) {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['services'],
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({ where: { id } });

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    const { datetime } = order;

    if (
      moment(datetime).diff(moment(), 'hour', true) > MAX_ORDER_EDITABLE_HOURS
    ) {
      throw new HttpException('Order is not editable', HttpStatus.BAD_REQUEST);
    }

    const { services, totalfee } = updateOrderDto;

    const servicesEntities = await this.serviceRepository.findBy({
      id: In(services),
    });

    if (servicesEntities.length !== services.length) {
      throw new HttpException('Service not found', HttpStatus.BAD_REQUEST);
    }

    order.services = servicesEntities;
    order.totalfee = totalfee;
    order.datetime = new Date();

    return this.orderRepository.save(order);
  }

  remove(id: string) {
    return this.orderRepository.delete(id);
  }
}
