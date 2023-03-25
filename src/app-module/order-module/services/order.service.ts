import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { OrderEntity } from "../entities/order.entity";
import { OrderInterface } from "../interface/order.interface";
import { OrderResponseInterface } from "../interface/response/order.response";
import { OrderRepository } from "../repository/order.repository";
const _ = require("lodash");
@Injectable()
export class OrderService {
  constructor(
    @Inject("winston")
    private readonly logger: Logger,
    private orderRepository: OrderRepository
  ) {}
  public async save(body: any): Promise<OrderEntity | any> {
    const isOrderExist = await this.orderRepository.findByUserId(body.userId);
    console.log("isOrderExist", isOrderExist);
    if (isOrderExist && isOrderExist !== null)
      throw new BadRequestException("Order already exists");
    try {
      const orderEntity = Object.assign(body, new OrderEntity());
      const data = await this.orderRepository.saveOrder(orderEntity);
      return { ...this.orderResponse(data) };
    } catch (error) {
      console.log(" Error", error);
      if (error.code === 11000) throw new BadRequestException("Exists");
      else {
        throw new BadRequestException("Internal Server Error");
      }
    }
  }
  public async findByPagnation(
    skip: number,
    limit: number,
    page: number,
    userId: string
  ) {
    try {
      const data = await this.orderRepository.findByPagination(
        skip,
        limit + 1,
        userId ? { userId: userId } : {}
      );
      const nextPage = data.length < limit + 1 ? null : Number(page) + 1;
      const docs = data.length < limit + 1 ? data : data.slice(0, limit + 1);
      return {
        docs: docs,
        nextPage: nextPage,
      };
    } catch (error) {
      console.log("Error", error);
      return {
        docs: [],
        nextPage: null,
      };
    }
  }
  public async deleteByOrderId(orderId: string): Promise<any> {
    try {
      return this.orderRepository.deleteOrder(orderId);
    } catch (error) {
      console.log("Error", error);
      throw new BadRequestException("Internal Server Error");
    }
  }
  public async updateByOrderId(body: any, orderId: string): Promise<any> {
    try {
      return this.orderRepository.updateOrder(body, orderId);
    } catch (error) {
      console.log("Error", error);
      throw new BadRequestException("Internal Server Error");
    }
  }

  private orderResponse(orderModel: OrderInterface): OrderResponseInterface {
    return {
      services: orderModel.services,
      orderId: orderModel._id,
      createdAt: orderModel.createdAt,
      updatedAt: orderModel.updatedAt,
      userId: orderModel.userId,
    };
  }
}
