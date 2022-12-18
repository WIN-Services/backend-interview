import { Table, Column, BelongsToMany, Model } from 'sequelize-typescript';
import { Order } from './order.model';
import { ServiceOrder } from './service-order.model';

@Table({
    timestamps: true,
    underscored: true
})
export class Service extends Model<Service> {
    @Column
    name!: string;

    @BelongsToMany(() => Order, { as: 'orders', through: () => ServiceOrder })
    orders?: Order[];
}
