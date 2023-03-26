import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';


@Entity('services')
export class ServiceEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}