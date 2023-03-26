import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    datetime: Date;

    @Column({nullable: false})
    totalfee: number;

    @Column({type: 'jsonb', nullable: false})
    services: Object[];

    @Column({default: false, nullable: false})
    isArchived: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}