import { OrderResponse } from './get-all-orders.type';

export type GetOrderRequest = {
  orderId: string;
};

export type GetOrdersResponse = {
  order: OrderResponse;
};
