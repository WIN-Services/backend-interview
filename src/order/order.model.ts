// order.model.ts
import {Table, Model, Column, DataType, BelongsToMany, CreatedAt, UpdatedAt, HasMany} from 'sequelize-typescript';
import {ServiceRecord} from './service-record.model';
import {OrderServiceRecord} from "./order-service-record.model";

@Table(
    {timestamps: true}
)
export class Order extends Model<Order> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @Column({
        type: DataType.DATE,
    })
    datetime: Date;

    @Column({
        type: DataType.FLOAT,
    })
    totalFee: number;

    @BelongsToMany(() => ServiceRecord, {
        through: {
            model: () => OrderServiceRecord,
            unique: false,
            scope: {
                // You can add additional attributes to exclude here if needed
            }
        },
        foreignKey: 'orderId',
        otherKey: 'serviceRecordId',
    })
    services: ServiceRecord[];


    @CreatedAt
    createdAt: Date;

    // @Column({
    //     type: DataType.DATE,
    // })
    // @Default(DataType.NOW) // Set default value to current timestamp
    @UpdatedAt
    updatedAt: Date;

}
