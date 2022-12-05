import { EntityManager } from 'typeorm';
import { Order } from '../entities/Order';

export interface IOrderDatastore {
  saveOrder(object: Order, transaction?: EntityManager): Promise<Order>;

  deleteOrder(object: Order, transaction?: EntityManager): Promise<void>;

  deleteOrders(objectIds: string[], transaction?: EntityManager): Promise<void>;

  getOrder(objectId: string, transaction?: EntityManager): Promise<Order | null>;

  getOrders(offset: number, limit: number, transaction?: EntityManager): Promise<[Order[], number]>;
}
