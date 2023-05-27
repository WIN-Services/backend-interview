import OrderService  from "../services/order.services";
import { getRepository } from "typeorm";
import Services from "../services/servive.service";
import { Service } from "../models/services.model";
const orderService = new OrderService();
const serviceService = new Services();

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

      if(services.filter((service)=>{
        service.id===serviceId
      })){
        return { message: "success", status: "Already updated" };
      }

      const service = await serviceService.fetchService(serviceId)
      if (!service) {
        throw new Error("service does not exist");
      }
      const orderDataToUpdate = {
        ...order,
        services: [service, ...services],
      };
      const serviceDataToUpdate = {
        ...service,
        orders: [order, ...service.orders],
      };
      await orderService.updateOrder(orderId, orderDataToUpdate);
      await serviceRepository.save(serviceDataToUpdate);
      return { message: "success", status: "updated" };
    } catch (err) {
      throw err;
    }
  }
}

export default CommonController;
