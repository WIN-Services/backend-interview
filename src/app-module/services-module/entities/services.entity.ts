import { Exclude } from "class-transformer";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BeforeInsert } from "typeorm";

@Schema({ timestamps: true })
export class ServicesEntity {
  @Prop({ required: true })
  public name: string;

  @Prop({ required: true, default: 0 })
  public fee: number;

  @Prop({ required: true })
  public description: string;

  @Exclude()
  @Prop({ default: false })
  public isDeleted: boolean;

  @BeforeInsert()
  beforeInsertActions(): void {
    this.isDeleted = false;
  }
}
export const ServicesSchema = SchemaFactory.createForClass(ServicesEntity);
