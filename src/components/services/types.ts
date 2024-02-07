import { Document } from 'mongoose';

export interface ServiceType {
  serviceId: string;
  name: string;
  price: number;
}

export interface TService extends ServiceType, Document { }