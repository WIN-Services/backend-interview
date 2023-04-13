import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {v4 as uuidv4} from "uuid";

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
  collection: 'win_service_v1',
})
export class OrderServiceEntity {
  @Prop({ default: uuidv4 })
  _id: string;
  @Prop({ required: true, type: String })
  name: string;
  @Prop({ required: true, type: Number })
  amount: number;
  @Prop({ index: true, type: Date })
  created_at?: Date;
  @Prop({ index: false, type: Date })
  updated_at?: Date;
}

export const OrderServiceCollection = 'win_order_service_v1';
export type OrderServiceDocument = OrderServiceEntity & Document;
export const OrderServiceSchema =
  SchemaFactory.createForClass(OrderServiceEntity);
