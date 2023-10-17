import { BaseModel } from './base.model';
import { generateRandomString } from '../../../utils/random';

export type Customer = BaseModel & {
  id: string;
  name: string;
  phone: string;
  email?: string;
};

export const generateCustomerId = () => `customer_${generateRandomString(10)}`;
