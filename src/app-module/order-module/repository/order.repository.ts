import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OrderEntity } from "../entities/order.entity";
import { OrderInterface } from "../interface/order.interface";

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel("Order") private orderModel: Model<OrderInterface>
  ) {}
  public async saveOrder(body: OrderEntity): Promise<OrderInterface> {
    const orderInterface = new this.orderModel(body);
    return orderInterface.save();
  }
  public async findByPagination(
    skip: number,
    limit: number,
    condition: any
  ): Promise<any> {
    const result = await this.orderModel
      .find(
        {
          ...condition,
          isDeleted: false,
        },
        null,
        { limit: limit, skip: skip }
      )
      .sort({ createdAt: -1 })
      .exec();
    console.log("result", result);
    const orderArray = [];
    result.map((data) => {
      orderArray.push({
        services: data.services,
        userId: data.userId,
        orderId: JSON.parse(JSON.stringify(data._id)),
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      });
    });
    return orderArray;
  }
  public async updateOrder(
    body: Partial<OrderEntity>,
    orderId: string
  ): Promise<any> {
    const data = await this.orderModel.findOneAndUpdate(
      { _id: orderId },
      {
        services: body.services,
      },
      { new: true }
    );
    return data;
  }
  public async deleteOrder(orderId: string): Promise<any> {
    const data = await this.orderModel.findOneAndUpdate(
      { _id: orderId },
      {
        isDeleted: true,
      },
      { new: true }
    );
    return data;
  }
  public async findByUserId(userId: string) {
    const data = await this.orderModel
      .findOne({
        isDeleted: false,
        userId: userId,
      })
      .sort({ createdAt: -1 })
      .exec();
    return data;
  }
}
