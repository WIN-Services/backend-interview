import { Column, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./order.entity";


export class Service {
   @PrimaryGeneratedColumn('uuid')
   id : string;

   @Column()
   name : string

  @Column()
  cost : number

  @ManyToOne(() => Order, (Order) => Order.service)
  order : Order;


  @CreateDateColumn()
  createdAt : Date;

  @UpdateDateColumn()
  updatedAt : Date;




}