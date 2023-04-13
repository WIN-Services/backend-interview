import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {OrderServiceEntity} from "./order-service.entity";


@Schema({
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
    collection: 'win_oms_v1',
})
export class OrderEntity {
    @Prop({ indexes: true,type:String })
    _id: string;
    @Prop({ required: true, index: true,type:String })
    user_id: string;
    @Prop({ required: true, type:Number })
    total_fee: number;
    @Prop({ required: true, type: Array(OrderServiceEntity) })
    order_items: OrderServiceEntity[];
    @Prop({ index: true,type:Date })
    created_at?: Date;
    @Prop({ index: false,type:Date })
    updated_at?: Date;
}

export const OrderCollection = 'win_oms_v1';
export type OrderDocument = OrderEntity & Document;
export const OrderSchema = SchemaFactory.createForClass(OrderEntity);