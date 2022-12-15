import { 
  Table,
  Model,
  Unique,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey
 } from "sequelize-typescript";
import { Order } from "./order.model";
import { ServiceRecord } from "./service-record.model";

@Table({
  timestamps: true,
  paranoid  : false,
  tableName : "order_service"
})
export class OrderServiceRecord extends Model<OrderServiceRecord> {
  @Unique
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @ForeignKey(() => Order)
  @Column(DataType.BIGINT)
  order_id: number;

  @ForeignKey(() => ServiceRecord)
  @Column(DataType.BIGINT)
  service_id: number;
}