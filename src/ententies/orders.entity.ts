import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Services } from './services.entity';

@Entity({name: 'orders'})
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'date_time', default:  () => 'CURRENT_TIMESTAMP'})
  dateTime: Date;

  @Column({name: 'total_fee'})
  totalFee: number;

  @Column({ name: 'service_id', array: true, type: 'int'})
  services: number[];

}