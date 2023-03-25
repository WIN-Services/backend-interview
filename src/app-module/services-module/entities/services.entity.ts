import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'services' })
export class ServicesEntity {
  @PrimaryGeneratedColumn({ name: 'increment_id' })
  incrementId: number;

  @Column({ name: 'id', nullable: false })
  id: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'fee', nullable: false })
  fee: number;

  @Column({ name: 'description', nullable: false })
  description: string;

  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  public updatedAt: Date;
}
