import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Order } from './Order';

@Entity('Service')
export class Service {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  public id: string;

  @Column({ type: 'varchar', length: 255 })
  public name: string;

  @Column({ type: 'float' })
  public fee: number;

  @Column({ type: 'varchar', length: 255 })
  public createdBy: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToMany(() => Order, order => order.services)
  orders: Order[];
}
