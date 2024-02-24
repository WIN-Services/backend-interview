import { Prisma } from "@prisma/client";
import { prisma } from "..";
import { CreateOrderSchema, UpdateOrderSchema } from "../schema/order";
import { ORDER_COOL_DOWN_TIME } from "../secrets";

class OrderService {
  static getInstance(): OrderService {
    return new OrderService();
  }

  async createOrder(data: CreateOrderSchema) {
    const serviceIds = data.services.map((serviceId) => {
      return {
        id: serviceId,
      };
    });
    return await prisma.order.create({
      data: {
        totalFee: data.totalFee,
        dateTime: new Date().toISOString(),
        services: serviceIds,
      },
    });
  }

  async getOrders() {
    return await prisma.order.findMany();
  }

  async getOrderById(id: number) {
    return await prisma.order.findFirst({
      where: {
        id,
      },
    });
  }

  async deleteOrderById(id: number) {
    await prisma.order.delete({
      where: {
        id,
      },
    });
  }

  async getLatestOrder() {
    return await prisma.order.findMany({
      where: {
        dateTime: {
          lt: new Date(Date.now() - ORDER_COOL_DOWN_TIME).toISOString(),
        },
      },
    });
  }

  async updateOrder(id: number, data: UpdateOrderSchema) {
    if (data.services?.length) {
      const serviceIds = data.services.map((serviceId) => {
        return {
          id: serviceId,
        };
      });

      await prisma.order.update({
        where: {
          id,
        },
        data: {
          services: serviceIds,
        },
      });
    }

    if (data.totalFee) {
      await prisma.order.update({
        where: {
          id,
        },
        data: {
          totalFee: data.totalFee,
        },
      });
    }

    return this.getOrderById(id);
  }
}

export const orderService = OrderService.getInstance();
