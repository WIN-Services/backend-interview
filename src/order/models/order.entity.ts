import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ServiceEntity } from '../../service/models/service.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  dateTime: Date;

  @Column({ nullable: false })
  totalFee: number;

  @Column({ nullable: false })
  serviceId: number;

  @Column({ default: false, nullable: false })
  isArchived: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @ManyToOne(() => ServiceEntity, (serviceEntity) => serviceEntity.orders)
  // service: ServiceEntity;
}
