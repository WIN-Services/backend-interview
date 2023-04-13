import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

@Schema({
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
    collection: 'win_service_v1',
})
export class OrderServiceEntity {
    @Prop({ indexes: true,type:String })
    _id: string;
    @Prop({ required: true, index: true,type:String })
    user_id: string;
    @Prop({ required: true,type:String })
    name: string;
    @Prop({ index: true,type:Date })
    created_at?: Date;
    @Prop({ index: false,type:Date })
    updated_at?: Date;
}

export const OrderServiceCollection = 'win_order_service_v1';
export type OrderServiceDocument = OrderServiceEntity & Document;
export const OrderServiceSchema = SchemaFactory.createForClass(OrderServiceEntity);