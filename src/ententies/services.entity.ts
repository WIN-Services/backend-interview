import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'services'})
export class Services {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'name'})
  name: string;

}