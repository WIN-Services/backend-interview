import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Service } from '../../services/entities/service.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  datetime: Date;

  @Column()
  totalfee: number;

  @ManyToMany(() => Service)
  @JoinTable()
  services: Service[];
}
