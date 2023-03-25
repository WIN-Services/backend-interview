import { Exclude } from "class-transformer";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BeforeInsert } from "typeorm";

export class Services {
  @Prop({ required: true })
  id: string;
}

@Schema({ timestamps: true })
export class OrderEntity {
  @Prop({ required: true })
  public services: Services[];

  @Prop({ required: true, default: 0 })
  public totalFee: number;

  @Prop({ required: true })
  public userId: string;

  @Exclude()
  @Prop({ default: false })
  public isDeleted: boolean;

  @BeforeInsert()
  beforeInsertActions(): void {
    this.isDeleted = false;
  }
}
export const OrderSchema = SchemaFactory.createForClass(OrderEntity);
