import { Exclude } from "class-transformer";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BeforeInsert } from "typeorm";
class BaseEntity {
  @Exclude()
  @Prop({ default: false })
  public isDeleted: boolean;
  @BeforeInsert()
  beforeInsertActions(): void {
    this.isDeleted = false;
  }
}
@Schema({ timestamps: true })
export class UserEntity extends BaseEntity {
  @Prop({ unique: true })
  public email: string;

  @Prop({ required: false })
  public name: string;

  @Prop({ required: false })
  public orders: string;
}
export const UserSchema = SchemaFactory.createForClass(UserEntity);
