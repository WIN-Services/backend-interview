import { MoreThanOrEqual } from 'typeorm';
import { dataSource } from '../../common/config/orm.config';
import { OrderEntity } from '../../common/entities';
import { IOrder } from './order.type';

const orderRepository = dataSource.getRepository(OrderEntity);

const getAllOrder = () => orderRepository.find({ relations: ['services'] });

const getOrder = (id: string) =>
  orderRepository.findOne({ where: { id }, relations: ['services'] });

const createOrder = (order: IOrder) => orderRepository.save(order);

const updateOrder = (order: IOrder) => orderRepository.save(order);

const deleteOrder = (id: string) => orderRepository.softDelete(id);

const getOrderByThresholdTime = (thresholdTime: Date) =>
  orderRepository.findOne({
    where: { dateTime: MoreThanOrEqual(thresholdTime) },
  });

export default {
  createOrder,
  updateOrder,
  getOrder,
  getAllOrder,
  deleteOrder,
  getOrderByThresholdTime,
};
