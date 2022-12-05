import { inject, injectable } from 'inversify';
import { Connection, EntityManager } from 'typeorm';
import { INVERSIFY_TYPES } from '../../Inversify/InversifyTypes';
import { IOrderDatastore } from './OrderDatastore.interface';
import { Order } from '../entities/Order';
import { IDatabaseConnection } from '../instances/DatabaseConnection.interface';

@injectable()
export class OrderDatastore implements IOrderDatastore {
  constructor(
    @inject(INVERSIFY_TYPES.Database)
    private databaseConnection: IDatabaseConnection
  ) {}

  public async saveOrder(object: Order, transaction?: EntityManager): Promise<Order> {
    const executeQuery = (connection: Connection) => connection.getRepository(Order).save(object);
    if (transaction) {
      return executeQuery(transaction.connection);
    }
    return this.databaseConnection.usingConnection(executeQuery);
  }

  public async deleteOrder(object: Order, transaction?: EntityManager): Promise<void> {
    const executeQuery = (connection: Connection) =>
      connection
        .createQueryBuilder()
        .delete()
        .from(Order)
        .where('id = :id', {
          id: object.id,
        })
        .execute();
    if (transaction) {
      executeQuery(transaction.connection);
    } else {
      this.databaseConnection.usingConnection(executeQuery);
    }
  }

  public async deleteOrders(objectIds: string[], transaction?: EntityManager): Promise<void> {
    const executeQuery = (connection: Connection) =>
      connection
        .createQueryBuilder()
        .delete()
        .from(Order)
        .whereInIds(objectIds)
        .execute();
    if (transaction) {
      executeQuery(transaction.connection);
    } else {
      this.databaseConnection.usingConnection(executeQuery);
    }
  }

  public async getOrder(objectId: string, transaction?: EntityManager): Promise<Order | null> {
    
    const executeQuery = (connection: Connection) =>
      connection
        .getRepository(Order)
        .createQueryBuilder('Order')
        .leftJoinAndSelect("Order.services", "services")
        .where('Order.id = :id', { id: objectId })
        .getOne();
    if (transaction) {
      return executeQuery(transaction.connection);
    }
    return this.databaseConnection.usingConnection(executeQuery);
  }

  public async getOrders(offset: number, limit: number, transaction?: EntityManager): Promise<[Order[], number]> {
    const executeQuery = (connection: Connection) =>
      connection.getRepository(Order).createQueryBuilder('Order')
      .leftJoinAndSelect("Order.services", "services")
      .skip(offset).take(limit).getManyAndCount();
    if (transaction) {
      return executeQuery(transaction.connection);
    }
    return this.databaseConnection.usingConnection(executeQuery);
  }
}
