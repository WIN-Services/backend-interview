import { Table, Column, BelongsToMany, Model } from 'sequelize-typescript';
import { Service, ServiceOrder } from '.';

@Table({
    timestamps: true,
})
export class Order extends Model<Order> {
    @Column
    totalFee!: number;

    @Column
    userId!: number;

    @BelongsToMany(() => Service, { as: 'services', through: () => ServiceOrder })
    services!: Service[];
}

