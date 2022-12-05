import { IService } from "./IService";

export interface IOrder {
  id: string;
  description?: string;
  totalFee: number;
  userId: string;
  createdAt:Date;
  updatedAt:Date;
  services: IService[];
}
