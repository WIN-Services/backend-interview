import { 
  Table,
  Model,
  Unique,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  BelongsToMany
 } from "sequelize-typescript";
import { OrderServiceRecord } from "./order-service-record.model";
import { Order } from "./order.model";

@Table({
  timestamps: true,
  paranoid  : false,
  tableName : "service_records"
})
export class ServiceRecord extends Model<ServiceRecord> {
  @Unique
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @Column(DataType.STRING)
  name: string;

  @BelongsToMany(() => Order, () => OrderServiceRecord)
  orders: Order[];
}