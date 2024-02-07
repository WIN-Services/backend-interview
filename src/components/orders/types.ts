import { Document } from 'mongoose';

export interface OrderType {
  totalfee: number;
  services: {
    id: string;
  }[];

}

export interface TOrder extends OrderType, Document { }