import { v4 as uuid } from 'uuid';
import { inject, injectable } from 'inversify';
import HttpStatus from 'http-status-codes';
import { INVERSIFY_TYPES } from '../Inversify/InversifyTypes';
import { IOrderManagementRepository } from './OrderManagementRepository.interface';
import { ILogger } from '../common/logging/Logger.interface';
import { IDatabaseConnection } from '../database/instances/DatabaseConnection.interface';
import { Order } from '../database/entities/Order';
import { IRequestOrderParams } from '../server/controllers/orderManagementController/RequestOrderMiddleware';
import { Service } from '../database/entities/Service';
import { IOrderDatastore } from '../database/datastores/OrderDatastore.interface';
import { ILocalizeService } from '../instances/others/LocalizeService.interface';
import { Exception } from '../common/exceptions/Exception';
import { IOrder } from '../server/dto/IOrder';
import { orderResponse } from '../common/helpers/ResponseHandle';
import { NotFoundException } from '../common/exceptions/NotFoundException';
import { IUpdateOrderParams } from '../server/controllers/orderManagementController/UpdateOrderMiddleware';
import { IOrders } from '../server/dto/IOrders';

@injectable()
export class OrderManagementRepository implements IOrderManagementRepository {
  constructor(
    @inject(INVERSIFY_TYPES.Logger) private logger: ILogger,
    @inject(INVERSIFY_TYPES.LocalizeService) private localizeService: ILocalizeService,
    @inject(INVERSIFY_TYPES.Database) private database: IDatabaseConnection,
    @inject(INVERSIFY_TYPES.OrderDatastore) private orderDatastore: IOrderDatastore
  ) {}

  public async save(order:IRequestOrderParams): Promise<void> {

    await this.database.usingTransaction(async transaction => {

      const orderObject = new Order();
      orderObject.id = uuid();
      orderObject.description = order.description;
      orderObject.userId = order.userId;
      orderObject.totalFee = order.totalFee;

      const services = order.services.map( serviceId => {
        const serviceObject = new Service();
        serviceObject.id = serviceId;
        return serviceObject;
      })

      orderObject.services = services;

      try {
        await this.orderDatastore.saveOrder(orderObject, transaction);        
      } catch (error) {
        this.logger.error('error while creating order', error.description);
        const message = this.localizeService.getLocalizationMessage('SomthingWentWrong');
        throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR, message);
      }
    });
  }

  public async getOrderDetails(orderId:string): Promise<IOrder> {
    return this.database.usingTransaction(async transaction => {
      try {
        const order = await this.orderDatastore.getOrder(orderId, transaction);          
        if (!order) {
          this.logger.error('error while get order details');
          throw new NotFoundException('Order details not found');
        } 

        return orderResponse(order);
        
      } catch (error) {
        this.logger.error('error while get order details', error.description);
        const message = this.localizeService.getLocalizationMessage('SomthingWentWrong');
        throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR, message);
      }
    });
  }

  public async getOrders(page: number, limit: number): Promise<IOrders> {
    return this.database.usingTransaction(async transaction => {
      try {

        const pageRecords = limit ?? 15;
        const offset = page ? pageRecords * (page - 1) : 0;
    
        const [orders, total] = await this.orderDatastore.getOrders(offset, limit, transaction);

        return {
          totalPages: Math.ceil(total / pageRecords),
          totalRecords: total,
          orders: orders.map(order => orderResponse(order)),
        }
      } catch (error) {
        this.logger.error('error while get order details', error.description);
        const message = this.localizeService.getLocalizationMessage('SomthingWentWrong');
        throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR, message);
      }
    });
  }

  public async updateOrder(order: IUpdateOrderParams): Promise<void> {
    await this.database.usingTransaction(async transaction => {

      try {
        const orderObject = await this.orderDatastore.getOrder(order.id, transaction);          
        if (!orderObject) {
          this.logger.error('error while get order details');
          throw new NotFoundException('Order details not found');
        } 

        orderObject.description = order.description;
        orderObject.userId = order.userId;
        orderObject.totalFee = order.totalFee;

        const services = order.services.map( serviceId => {
          const serviceObject = new Service();
          serviceObject.id = serviceId;
          return serviceObject;
        })
  
        orderObject.services = services;

        await this.orderDatastore.saveOrder(orderObject, transaction);        
      } catch (error) {
        this.logger.error('error while creating order', error.description);
        const message = this.localizeService.getLocalizationMessage('SomthingWentWrong');
        throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR, message);
      }
    });
  }

  public async deleteOrder(orderId:string): Promise<void> {
    return this.database.usingTransaction(async transaction => {
      try {

        const orderObject = await this.orderDatastore.getOrder(orderId, transaction);          
        if (!orderObject) {
          this.logger.error('error while get order details');
          throw new NotFoundException('Order details not found');
        } 

        await this.orderDatastore.deleteOrder(orderObject, transaction);          
      } catch (error) {
        this.logger.error('error while get order details', error.description);
        const message = this.localizeService.getLocalizationMessage('SomthingWentWrong');
        throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR, message);
      }
    });
  }
}
