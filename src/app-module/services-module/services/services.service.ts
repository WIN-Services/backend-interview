import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { ServicesEntity } from "../entities/services.entity";
import { ServicesInterface } from "../interface/services.interface";
import { ServicesResponseInterface } from "../interface/response/services.response";
import { ServicesRepository } from "../repository/services.repository";
const _ = require("lodash");
@Injectable()
export class ServicesService {
  constructor(
    @Inject("winston")
    private readonly logger: Logger,
    private servicesRepository: ServicesRepository
  ) {}
  public async save(body: any): Promise<ServicesEntity | any> {
    try {
      const OrderServiceEntity = Object.assign(body, new ServicesEntity());
      const data = await this.servicesRepository.saveService(
        OrderServiceEntity
      );
      return { ...this.servicesResponse(data) };
    } catch (error) {
      console.log(" Error", error);
      if (error.code === 11000) throw new BadRequestException("Exists");
      else {
        throw new BadRequestException("Internal Server Error");
      }
    }
  }
  public async findByPagnation(skip: number, limit: number, page: number) {
    try {
      const data = await this.servicesRepository.findByPagination(
        skip,
        limit + 1
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
  public async deleteByServiceId(serviceId: string): Promise<any> {
    try {
      return this.servicesRepository.deleteService(serviceId);
    } catch (error) {
      console.log("Error", error);
      throw new BadRequestException("Internal Server Error");
    }
  }
  public async updateByServiceId(body: any, serviceId: string): Promise<any> {
    try {
      return this.servicesRepository.updateService(body, serviceId);
    } catch (error) {
      console.log("Error", error);
      throw new BadRequestException("Internal Server Error");
    }
  }

  private servicesResponse(
    serviceModel: ServicesInterface
  ): ServicesResponseInterface {
    return {
      serviceId: serviceModel._id,
      createdAt: serviceModel.createdAt,
      updatedAt: serviceModel.updatedAt,
      name: serviceModel.name,
      description: serviceModel.description,
      fee: serviceModel.fee,
    };
  }
}
