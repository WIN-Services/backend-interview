import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ServiceRecord } from '../../service-record/entities/service-record.entity';
import { BaseEntity } from '../../base/base.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp without time zone',
    name: 'date_time',
  })
  dateTime: Date;

  @Column({
    type: 'integer',
    name: 'total_fee',
  })
  totalFee: number;

  @ManyToMany(() => ServiceRecord)
  @JoinTable()
  services: ServiceRecord[];
}
