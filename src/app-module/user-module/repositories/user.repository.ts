import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserEntity } from "../entities/user.entity";
import { UserInterface } from "../interface/user.interface";
@Injectable()
export class UserRepository {
  constructor(@InjectModel("User") private userModel: Model<UserInterface>) {}
  public async saveUser(body: UserEntity): Promise<UserInterface> {
    const userInterface = new this.userModel(body);
    return userInterface.save();
  }
  public async updateUser(
    body: Partial<UserEntity>,
    userId: string
  ): Promise<any> {
    const data = await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        countryCode: body.email,
        phoneNumber: body.name,
      },
      { new: true }
    );
    return data;
  }
  public async deleteUser(userId: string): Promise<any> {
    const data = await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        isDeleted: true,
      },
      { new: true }
    );
    return data;
  }
  public async findByEmail(email: string): Promise<UserInterface> {
    const data = await this.userModel
      .findOne({
        email: email,
        isDeleted: false,
      })
      .exec();
    return data;
  }
  public async findById(userId: string): Promise<UserInterface> {
    const data = await this.userModel
      .findOne({
        _id: userId,
        isDeleted: false,
      })
      .exec();
    return data;
  }

  public async findByPagination(skip: number, limit: number): Promise<any> {
    const result = await this.userModel
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
    const userArray = [];
    result.map((data) => {
      userArray.push({
        email: data.email,
        name: data.name,
        userId: JSON.parse(JSON.stringify(data._id)),
      });
    });
    return userArray;
  }
}
