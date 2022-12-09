import { Column, CreateDateColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Service } from "./service.entity";

export class Order {

    

@PrimaryGeneratedColumn('uuid')
id : string

@Column()
totalFee : number

@OneToMany(() => Service, (Service) => Service.order)
service : Service[]


@CreateDateColumn()
createdAt : Date;

@UpdateDateColumn()
updateAt : Date;


}
