import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Service } from "./services.model";
import {CreateOrderInput} from "../interfaces/order.interface"

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  totalFee!: number;

  @ManyToMany(() => Service)
  @JoinTable()
  services!: Service[];

  public prepareToCreate(input: CreateOrderInput): void {
    this.totalFee = input.totalFee;
    this.services = input.serviceIds.map(serviceId => {
      const service = new Service();
      service.id = serviceId;
      return service;
    });
  }

}
