import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Order } from "./order.model";
import {CreateServiceInput} from "../interfaces/services.interface"
@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToMany(() => Order)
  @JoinTable()
  orders!: Order[];

  public prepareToCreate(input: CreateServiceInput): void {
    this.name = input.name;
    this.orders = input.orderIds.map(orderId => {
      const order = new Order();
      order.id = orderId;
      return order;
    });
  }

}
