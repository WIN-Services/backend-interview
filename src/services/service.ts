import { prisma } from "..";
import { CreateServiceSchema, UpdateServiceSchema } from "../schema/service";

class ServiceService {
  static getInstance(): ServiceService {
    return new ServiceService();
  }

  async getServices() {
    return await prisma.service.findMany();
  }

  async createService(data: CreateServiceSchema) {
    return await prisma.service.create({
      data: {
        name: data.name,
      },
    });
  }

  async getServiceById(id: number) {
    return await prisma.service.findFirst({
      where: {
        id,
      },
    });
  }

  async getServiceByIds(ids: number[]) {
    return await prisma.service.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async updateService(id: number, data: UpdateServiceSchema) {
    return await prisma.service.update({
      where: {
        id,
      },
      data: {
        name: data.name,
      },
    });
  }

  async deleteServiceById(id: number) {
    return await prisma.service.delete({
      where: {
        id,
      },
    });
  }
}

export const serviceService = ServiceService.getInstance();
