export class ServiceRecord { }
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';


@Schema({
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
    collection: 'product_service',
})
export class ProductService {
    @Prop({ default: uuidv4 })
    _id: string;
    @Prop({ required: true, type: String })
    name: string;
    @Prop({ required: true, type: String })
    display_name: string;
    @Prop({ required: true, type: String })
    description: string;
    @Prop({ required: true, default: 2 })
    price: number;
    @Prop({ required: true, type: String, default: "usd", index: true })
    currency: number;
    @Prop({ required: true, default: true })
    is_active: boolean;
}

export const productServiceCollection = 'product_service';
export type productServiceDocument = ProductService & Document;
export const productServiceSchema = SchemaFactory.createForClass(ProductService);
