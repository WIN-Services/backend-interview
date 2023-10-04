// order-service-record.model.ts
import {Table, Model, Column, DataType, ForeignKey, CreatedAt, UpdatedAt, BelongsToMany} from 'sequelize-typescript';
import {Order} from './order.model';
import {ServiceRecord} from './service-record.model';

@Table({
    timestamps: true
})
export class OrderServiceRecord extends Model<OrderServiceRecord> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @ForeignKey(() => Order)
    @Column({
        type: DataType.STRING,
        primaryKey: true,
    })
    orderId: number;

    @ForeignKey(() => ServiceRecord)
    @Column({
        type: DataType.STRING,
        primaryKey: true,
    })
    serviceRecordId: number;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}
