import { getRepository, OrderByCondition } from "typeorm";
import { Order } from "../models/order.model";

class OrderService {

  async createOrder(data: Partial<Order>): Promise<Order> {
    const orderRepository = getRepository(Order);
    const order = orderRepository.create(data);
    return orderRepository.save(order);
  }

  async fetchOrder(orderId: number): Promise<Order | undefined> {
    const orderRepository = getRepository(Order);
    return orderRepository.findOne(orderId);
  }

  async fetchAllOrders(filter: any = {}, skip: number = 0, limit: number = 0): Promise<Order[]> {
    const orderRepository = getRepository(Order);
    const orderBy: OrderByCondition = {
      createdAt: "DESC",
    };
    return orderRepository.find({
      where: filter,
      order: orderBy,
      skip,
      take: limit,
    });
  }

  async destroyOrder(orderId: number): Promise<Order | undefined> {
    const orderRepository = getRepository(Order);
    const order = await orderRepository.findOne(orderId);
    if (order) {
      await orderRepository.remove(order);
    }
    return order;
  }

  async updateOrder(orderId: number, data: Partial<Order>): Promise<Order | undefined> {
    const orderRepository = getRepository(Order);
    const order = await orderRepository.findOne(orderId);
    if (order) {
      Object.assign(order, data);
      await orderRepository.save(order);
    }
    return order;
  }
}

export default OrderService;
