import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Service } from './Service';

@Entity('Order')
export class Order {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  public id: string;

  @Column({ type: 'float' })
  public totalFee: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public description?: string;

  @Column({ type: 'varchar', length: 255 })
  public userId: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToMany(() => Service, service => service.orders)
  @JoinTable({
    name: 'OrderServices',
    joinColumn: {
      name: 'orderId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'serviceId',
      referencedColumnName: 'id',
    }
  })
  services: Service[];

}
