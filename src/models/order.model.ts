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
import { ServiceRecord } from "./service-record.model";

@Table({
  timestamps: true,
  paranoid  : false,
  tableName : "orders"
})
export class Order extends Model<Order> {
  @Unique
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @Column(DataType.FLOAT)
  total_fee: number;

  @BelongsToMany(() => ServiceRecord, () => OrderServiceRecord)
  services: ServiceRecord[];
}