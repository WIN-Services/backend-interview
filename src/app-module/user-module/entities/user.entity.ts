import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'increment_id' })
  incrementId: number;

  @Column({ name: 'user_id', nullable: false, unique: true })
  id: string;

  @Column({ name: 'email', nullable: false, unique: true })
  email: string;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'orders', nullable: true })
  orders: string;

  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  public updatedAt: Date;
}
