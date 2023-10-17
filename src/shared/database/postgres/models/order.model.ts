import { BaseModel } from './base.model';
import { generateRandomString } from '../../../utils/random';

export enum OrderStatus {
  CREATED = 'CREATED',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
}

export type Order = BaseModel & {
  id: string;
  status: OrderStatus;
};

export const generateOrderId = () => `order_${generateRandomString(10)}`;
