import { IService } from "./services";
import { Schema, model } from 'mongoose';

export interface IOrder {
  id: string,
  datetime: Date,
  totalfee: number,
  services: IService[]
}

const serviceSchema = new Schema<any>({
  id: { type: String, required: true }
},{ _id : false })

const orderSchema = new Schema<IOrder>({
  datetime: { type: Date, required: true },
  totalfee: { type: Number, required: true },
  services: [serviceSchema]
},{
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

export const Order = model('Order', orderSchema);

