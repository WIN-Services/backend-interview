import { BaseModel } from './base.model';

export type OrderService = BaseModel & {
  orderId: string;
  serviceId: string;
};
