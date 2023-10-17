import { Order } from '../../../shared/database/postgres/models/order.model';
import { Service } from '../../../shared/database/postgres/models/service.model';

export type OrderResponse = Order & {
  totalFee: number;
  currencyCode: string;
  services: Array<Service>;
};

export type GetAllOrdersResponse = {
  orders: Array<OrderResponse>;
};
