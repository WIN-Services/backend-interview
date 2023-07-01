import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

class Service {
  id: string;
  amount: number;
}

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
  collection: 'order',
})
export class Order {
  @Prop({ default: uuidv4 })
  _id: string;

  @Prop()
  total_amount: number;

  @Prop()
  services: Service[];

  @Prop({})
  user_id: string;

  @Prop({ default: false, index: true, type: Boolean })
  is_deleted?: boolean;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const OrderCollection = 'order_v1';
export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
