import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('orders')
export class OrdersEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    totalfee: number

    @Column({ type: 'text', array: true })
    service: any[]

    @CreateDateColumn()
    datetime: Date

    @UpdateDateColumn()
    updatedAt: Date
}