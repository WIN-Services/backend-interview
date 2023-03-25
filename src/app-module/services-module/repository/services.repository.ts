import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ServicesEntity } from "../entities/services.entity";
import { ServicesInterface } from "../interface/services.interface";

@Injectable()
export class ServicesRepository {
  constructor(
    @InjectModel("Services") private servicesModel: Model<ServicesInterface>
  ) {}
  public async saveService(body: ServicesEntity): Promise<ServicesInterface> {
    const orderInterface = new this.servicesModel(body);
    return orderInterface.save();
  }
  public async findByPagination(skip: number, limit: number): Promise<any> {
    const result = await this.servicesModel
      .find(
        {
          isDeleted: false,
        },
        null,
        { limit: limit, skip: skip }
      )
      .sort({ createdAt: -1 })
      .exec();
    console.log("result", result);
    const servicesArray = [];
    result.map((data) => {
      servicesArray.push({
        name: data.name,
        description: data.description,
        fee: data.fee,
        serviceId: JSON.parse(JSON.stringify(data._id)),
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      });
    });
    return servicesArray;
  }
  public async updateService(
    body: Partial<ServicesEntity>,
    orderId: string
  ): Promise<any> {
    const data = await this.servicesModel.findOneAndUpdate(
      { _id: orderId },
      {
        name: body.name,
        description: body.description,
        fee: body.fee,
      },
      { new: true }
    );
    return data;
  }
  public async deleteService(serviceId: string): Promise<any> {
    const data = await this.servicesModel.findOneAndUpdate(
      { _id: serviceId },
      {
        isDeleted: true,
      },
      { new: true }
    );
    return data;
  }
}
