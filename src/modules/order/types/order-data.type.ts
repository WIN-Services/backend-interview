import { OrderService } from '../../../shared/database/postgres/models/order-service.model';

export type UpsertOrderServiceRecords = Array<
  Pick<OrderService, 'orderId' | 'serviceId'>
>;
