import { BelongsTo, Table, Column, ForeignKey, Model, DataType } from 'sequelize-typescript';
import { Service, Order } from '.';

@Table({
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: [
                'serviceId',
                'orderId'
            ]
        }
    ]
})
export class ServiceOrder extends Model<ServiceOrder> {
    @ForeignKey(() => Service)
    @Column({ type: DataType.INTEGER, primaryKey: true, onDelete: 'CASCADE' })
    serviceId!: number;

    @ForeignKey(() => Order)
    @Column({ type: DataType.INTEGER, primaryKey: true, onDelete: 'CASCADE' })
    orderId!: number;

    @BelongsTo(() => Service)
    service!: Service;

    @BelongsTo(() => Order)
    order!: Order;
}