import { BaseModel } from './base.model';
import { generateRandomString } from '../../../utils/random';

export type Service = BaseModel & {
  id: string;
  name: string;
  description?: string;
  fee: number;
  currencyCode: string;
};

export const generateServiceId = () => `service_${generateRandomString(10)}`;
