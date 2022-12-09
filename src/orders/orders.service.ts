import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Service } from './entities/service.entity';

@Injectable()
export class OrdersService {
  constructor(

    @InjectRepository(Order)
    private readonly orderRepo : Repository<Order>,
    @InjectRepository(Service)
    private readonly serviceRepo : Repository<Service>
  ){}

  async createOrder(createOrderDto: CreateOrderDto) {
    try{
      let totalFee : number
      const services = await this.serviceRepo.createQueryBuilder('service')
      .where('service.id IN (:...ids)', {ids : createOrderDto.services})
      .getMany();
      services.map((service) => {
        totalFee += service.cost
      })
      if(services.length != createOrderDto.services.length){
        throw new BadRequestException('please provide valild service Ids')
      }
      const order = await this.orderRepo.createQueryBuilder('order')
      .where('order.createdAt > :dt', {dt : new Date(Date.now() - 3 * 60 * 60 * 1000)})
      .getOne()

      if(order){
        order.service.map((service) => {
          if(services.includes(service)){
            throw new BadRequestException(`you cannot create order before ${new Date(order.createdAt.getTime() + 3 * 60 * 60 * 1000)}`)
          }
        })
      }

      const newOrder =  this.orderRepo.create({
        totalFee : totalFee,
        service : [...services]
      })

      const result = await this.orderRepo.save(newOrder);
      return {msg : 'Order created successfully', ...result}

    }catch(error){
      throw error
    }
  }

  async findAllOrders() {
    try{
      const Orders = await this.orderRepo.find();
    }catch(error){
      throw error;
    }
  }

  async findOne(id: string) {
    try{
      const order = await  this.orderRepo.findOne({
        where : {
          id : id
        }
      })
      if(!order){
        throw new BadRequestException("order doesn\'t exist")
      }
      return order;
    }catch(error){
      throw error
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try{
    const order = await this.findOne(id)
    let totalFee : number
    const services = await this.serviceRepo.createQueryBuilder('service')
    .where('service.id IN (:...ids)', {ids : updateOrderDto.services})
    .getMany();
    services.map((service) => {
      totalFee += service.cost
    })
    if(services.length != updateOrderDto.services.length){
      throw new BadRequestException('please provide valild service Ids')
    }
    order.service.map((service) => {
      if(services.includes(service)){
        throw new BadRequestException(`you cannot create order before ${new Date(order.createdAt.getTime() + 3 * 60 * 60 * 1000)}`)
      }
    })
    await this.orderRepo.update({id : order.id},{service : services})
    return {msg :  'order updated successfully'}
    }catch(error){
      throw error
    }
  }

  async remove(id: string) {
    try{
      const order = await this.findOne(id);
      await this.orderRepo.createQueryBuilder('order').delete().from('order').where('id = :id', {id : id}).execute();
      return {msg : 'order deleted successfully'}
    }catch(error){
      throw error;
    }
  }
}
