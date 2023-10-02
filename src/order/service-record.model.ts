// service-record.model.ts
import {Table, Model, Column, DataType, BelongsToMany, CreatedAt, Default, UpdatedAt} from 'sequelize-typescript';
import {Order} from './order.model';
import {OrderServiceRecord} from "./order-service-record.model";

@Table({
    timestamps: true
})
export class ServiceRecord extends Model<ServiceRecord> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
    })
    name: string;

    @BelongsToMany(() => Order, () => OrderServiceRecord)
    orders: Order[];


    @CreatedAt
    createdAt: Date;

    // @Column({
    //     type: DataType.DATE,
    // })
    // @Default(DataType.NOW) // Set default value to current timestamp
    @UpdatedAt
    updatedAt: Date;
}