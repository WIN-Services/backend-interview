import {
  Order,
  OrderStatus,
} from '../../../shared/database/postgres/models/order.model';
import { Service } from '../../../shared/database/postgres/models/service.model';

export type CreateNewOrderRequest = {
  status?: OrderStatus;
  services: string[];
};

export type CreateNewOrderResponse = {
  order: Order & {
    totalFee: number;
    currencyCode: string;
    services: Array<Service>;
  };
};
