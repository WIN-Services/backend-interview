import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ProductService, productServiceSchema } from 'src/product_service/entities/product-service.entity';
import { v4 as uuidv4 } from 'uuid';




@Schema({
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
    collection: 'orders',
})
export class Orders {
    @Prop({ default: uuidv4 })
    _id: string;
    @Prop({ required: true, index: true })
    customer_id: string;
    @Prop({ required: true, type: [ProductService] })
    items: ProductService[];
    @Prop({ required: true, type:Number })
    total_price: number;
    @Prop({ required: true, default: true, index: true })
    is_active: boolean;
    @Prop({ index: true, type: Date })
    created_at?: Date;
    @Prop({ type: Date })
    updated_at?: Date;
}

export const ordersCollection = 'orders';
export type ordersDocument = Orders & Document;
export const ordersSchema = SchemaFactory.createForClass(Orders);
