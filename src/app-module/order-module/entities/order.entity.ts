import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn({ name: 'increment_id' })
  incrementId: number;

  @Column({ nullable: false, name: 'order_id' })
  id: string;

  @Column({ nullable: false, name: 'services' })
  services: string;

  @Column({ default: 0, nullable: false, name: 'total_fee' })
  public totalFee: number;

  @Column({ nullable: false, name: 'user_id' })
  public userId: string;

  @Column({ default: false, name: 'is_deleted' })
  public isDeleted: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  public updatedAt: Date;
}
