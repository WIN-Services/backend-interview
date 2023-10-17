import { Order } from '../../../shared/database/postgres/models/order.model';
import { Service } from '../../../shared/database/postgres/models/service.model';

export type OrderResponse = Omit<Order, 'dateUpdated' | 'dateCreated'> & {
  dateCreated: string;
  dateUpdated: string;
  totalFee: number;
  currencyCode: string;
  services: Array<
    Omit<Service, 'dateUpdated' | 'dateCreated'> & {
      dateCreated: string;
      dateUpdated: string;
    }
  >;
};

export type GetAllOrdersResponse = {
  orders: Array<OrderResponse>;
};
