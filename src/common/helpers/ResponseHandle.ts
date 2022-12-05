import { Order } from '../../database/entities/Order';
import { Service } from '../../database/entities/Service';
import { IService } from '../../server/dto/IService';
import { IOrder } from '../../server/dto/IOrder';

export const serviceResponse = (service: Service): IService => ({
  id: service.id,
  name: service.name,
  fee: service.fee
});

export const orderResponse = (order: Order): IOrder => {
  
  let service:IService[] = []
  if(order.services.length>0) {
    service = order.services.map(service => serviceResponse(service));
  }
  
  return {
    id: order.id,
    description: order.description,
    totalFee: order.totalFee,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    userId: order.userId,
    services: service
  };
};