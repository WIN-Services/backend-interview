import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderedServices } from './ordered-services.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  datetime: Date;

  @Column()
  totalfee: number;

  @OneToMany(
    () => OrderedServices,
    (orderedService) => orderedService.serviceId,
  )
  services: OrderedServices[];
}
