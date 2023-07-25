import { Column, Entity } from 'typeorm';
import { BaseEntity, TABLE_NAME } from './constants';

@Entity(TABLE_NAME.SERVICES)
export class ServiceEntity extends BaseEntity {
  @Column({ type: 'text' })
  name: string;
}
