import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity, TABLE_NAME } from './constants';
import { ServiceEntity } from './service.entity';

@Entity(TABLE_NAME.ORDERS)
export class OrderEntity extends BaseEntity {
  @Column({ type: 'timestamptz', default: new Date() })
  dateTime: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalFee: number;

  @ManyToMany(() => ServiceEntity, { cascade: true })
  @JoinTable({ name: 'order-services' })
  services: ServiceEntity[];
}
