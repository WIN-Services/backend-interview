import { MESSAGES } from "../../constants/messages";
import OrdersModel from "../models/orders.model";
import ServicesModel from "../models/services.model";

export class OrdersHelper {
  constructor() {}

  getAllOrders = async (limit: number, offset: number) => {
    try {
      const getAllOrders = await OrdersModel.findAll({
        limit: limit,
        offset: offset,
      });
      if (getAllOrders) {
        return {
          error: false,
          data: getAllOrders,
        };
      }
    } catch (error: any) {
      return {
        error: true,
        message: MESSAGES.ORDERS.FETCH.FAIL,
      };
    }
  };

  async createOrder(userId: string, service: number) {
    try {
      let services: any = [];
      let alreadyServiceRequested = false;
      const checkServiceExists: any = await ServicesModel.findOne({
        where: { serviceId: service },
        attributes: ["fees"],
        raw: true,
      });
      if (!checkServiceExists) {
        return {
          error: true,
          message: MESSAGES.SERVICES.INVALID_SERVICE,
        };
      }
      const serviceFees = checkServiceExists.fees;
      const checkOrderAlreadyPresent: any = await OrdersModel.findOne({
        where: { userId: userId },
        attributes: ["services", "updatedAt", "totalFees"],
        order: [["updatedAt", "DESC"]],
        raw: true,
      });
      if (!checkOrderAlreadyPresent) {
        services.push({ serviceId: service });
        await OrdersModel.create({
          userId: userId,
          totalFees: serviceFees,
          services: services,
        });
        return {
          error: false,
          message: MESSAGES.ORDERS.CREATE.SUCCESS,
        };
      }
      const totalFees = checkOrderAlreadyPresent.totalFees;
      const specificDate = new Date(checkOrderAlreadyPresent.updatedAt);
      const currentDate = new Date();
      const timeDifferenceMs = currentDate.getTime() - specificDate.getTime();
      const timeDifferenceHours: any = timeDifferenceMs / (1000 * 60 * 60);
      if (timeDifferenceHours < 3) {
        alreadyServiceRequested = true;
      }
      if (alreadyServiceRequested) {
        return {
          error: true,
          message: MESSAGES.ORDERS.CREATE.ALREADY_EXISTS,
        };
      }
      const existingServices = checkOrderAlreadyPresent.services;
      existingServices.push({ serviceId: service });
      const createOrder = await OrdersModel.update(
        { totalFees: totalFees + serviceFees, services: existingServices },
        {
          where: {
            userId: userId,
          },
        }
      );
      if (createOrder) {
        return {
          error: false,
          message: MESSAGES.ORDERS.CREATE.SUCCESS,
        };
      }
      return {
        error: true,
        message: MESSAGES.ORDERS.CREATE.FAIL,
      };
    } catch (error: any) {
      return {
        error: true,
        message: MESSAGES.ORDERS.CREATE.FAIL,
      };
    }
  }

  async updateOrder(orderId: string, service: number) {
    try {
      let alreadyServiceRequested = false;
      const checkOrderAlreadyPresent: any = await OrdersModel.findOne({
        where: { orderId: orderId },
        attributes: ["services", "updatedAt", "totalFees"],
        raw: true,
      });
      console.log(checkOrderAlreadyPresent);
      const totalFees = checkOrderAlreadyPresent.totalFees;
      const getServiceFees: any = await ServicesModel.findOne({
        where: { serviceId: service },
        attributes: ["fees"],
        raw: true,
      });
      const serviceFees = getServiceFees.fees;
      const specificDate = new Date(checkOrderAlreadyPresent.updatedAt);
      const currentDate = new Date();
      const timeDifferenceMs = currentDate.getTime() - specificDate.getTime();
      const timeDifferenceHours: any = timeDifferenceMs / (1000 * 60 * 60);
      if (timeDifferenceHours < 3) {
        alreadyServiceRequested = true;
      }
      if (alreadyServiceRequested) {
        return {
          error: true,
          message: MESSAGES.ORDERS.UPDATE.NOT_ALLOWED,
        };
      }
      const newArray = checkOrderAlreadyPresent.services.filter(
        (obj: any) => obj.serviceId !== service
      );
      console.log(newArray, totalFees - serviceFees);

      const updateOrder = await OrdersModel.update(
        { services: newArray, totalFees: totalFees - serviceFees },
        {
          where: {
            orderId: orderId,
          },
        }
      );
      if (updateOrder) {
        return {
          error: false,
          message: MESSAGES.ORDERS.CREATE.SUCCESS,
        };
      }
      return {
        error: true,
        message: MESSAGES.ORDERS.CREATE.FAIL,
      };
    } catch (error: any) {
      console.log(error);
      return {
        error: true,
        message: MESSAGES.ORDERS.CREATE.FAIL,
      };
    }
  }

  async deleteOrder(orderId: string) {
    try {
      const deleteOrderByOrderId: any = await OrdersModel.destroy({
        where: { orderId: orderId },
      });
      if (deleteOrderByOrderId) {
        return {
          error: false,
          message: MESSAGES.ORDERS.DELETE.SUCCESS,
        };
      }
      return {
        error: true,
        message: MESSAGES.ORDERS.DELETE.FAIL,
      };
    } catch (error: any) {
      console.log(error);
      return {
        error: true,
        message: MESSAGES.ORDERS.DELETE.FAIL,
      };
    }
  }
}

export default new OrdersHelper();
