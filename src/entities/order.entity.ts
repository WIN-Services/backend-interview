import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Service } from './service.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  userId: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  readonly datetime: Date;

  @Column()
  totalfee: number;

  @ManyToMany(() => Service)
  @JoinTable()
  services: Service[];
}
