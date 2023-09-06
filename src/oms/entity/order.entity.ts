import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OrderServiceEntity, OrderServiceSchema } from './order-service.entity';
import { v4 as uuidv4 } from 'uuid';

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
  collection: 'win_oms_v1',
})
export class OrderEntity {
  @Prop({ default: uuidv4 })
  _id: string;
  @Prop({ required: true, index: true, type: String })
  user_id: string;
  @Prop({ required: true, type: Number })
  total_fee: number;
  @Prop({ required: true, type: [OrderServiceSchema] })
  order_items: OrderServiceEntity[];
  @Prop({ required: true, index: true, type: Boolean })
  is_deleted?: boolean;
  @Prop({ index: true, type: Date })
  created_at?: Date;
  @Prop({ index: false, type: Date })
  updated_at?: Date;
}

export const OrderCollection = 'win_oms_v1';
export type OrderDocument = OrderEntity & Document;
// @ts-ignore
export const OrderSchema = SchemaFactory.createForClass(OrderEntity);