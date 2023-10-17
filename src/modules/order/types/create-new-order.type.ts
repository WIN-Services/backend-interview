import { OrderStatus } from '../../../shared/database/postgres/models/order.model';
import { OrderResponse } from './get-all-orders.type';

export type CreateNewOrderRequest = {
  status?: OrderStatus;
  services: string[];
};

export type CreateNewOrderResponse = {
  order: OrderResponse;
};
