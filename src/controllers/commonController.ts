import OrderService  from "../services/order.services";
import {Service} from "../models/services.model"
import { getRepository } from "typeorm";

const orderService = new OrderService();

class CommonController {

  async addServiceInOrder(params: { serviceId: number, orderId: number }) {
    const serviceRepository = getRepository(Service);
    try {
      const { serviceId, orderId } = params;
      const order = await orderService.fetchOrder(orderId);
      if (!order) {
        throw new Error("order does not exist");
      }

      const { services } = order;
      console.log("services in the order--->",services)
    //   if (services.includes(serviceId)) {
    //     throw new Error("service already added to this order");
    //   }
      const service = await serviceRepository.findOne(serviceId); // Fetch the service entity using TypeORM

      if (!service) {
        throw new Error("service does not exist");
      }

      const orderDataToUpdate = {
        ...order,
        services: [service, ...services], // Store the service entity in the services array
      };

      const serviceDataToUpdate = {
        ...service,
        orders: [order, ...service.orders], // Store the order entity in the orders array
      };

      await orderService.updateOrder(orderId, orderDataToUpdate);
      await serviceRepository.save(serviceDataToUpdate); // Save the updated service entity

      return { message: "success", status: "updated", data: [] };
    } catch (err) {
      throw err;
    }
  }
}

export default CommonController;
