import { Entity, Column, Index } from 'typeorm';

@Entity()
export class OrderedServices {
  @Column()
  id: number;

  @Column()
  @Index()
  orderId: number;

  @Column()
  serviceId: number;
}
