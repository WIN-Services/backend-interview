import {
  BaseEntity as SuperBaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { nullable, select } from './constants';

export class BaseEntity extends SuperBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz', select })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', select })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable, select })
  deletedAt: Date;
}
