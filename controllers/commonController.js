import OrderDao from "../DBServices/orderDao.js";
import ServiceDao from "../DBServices/serviceDao.js";

const orderDao = new OrderDao();
const serviceDao = new ServiceDao();

class CommonController {
  async addServiceInOrder(params) {
    try {
      const { serviceId, orderId } = params;
      const order = await orderDao.fetchOrder(orderId);
      if (!order) {
        throw "order does not exist";
      }

      const { services } = order;
      if (services.includes(serviceId)) {
        throw "service already added to this order";
      }
      const service = await serviceDao.fetchService(serviceId);
      if (!service) {
        throw "service does not exist";
      }

      const orderDataToUpdate = {
        ...order._doc,
        services: [serviceId, ...services],
      };

      const serviceDataToUpdate = {
        ...service._doc,
        orders: [orderId, ...service._doc.orders],
      };
      await orderDao.updateOrder(orderId, orderDataToUpdate);
      await serviceDao.updateService(serviceId, serviceDataToUpdate);
      return { message: "success", status: "updated", data: [] };
    } catch (err) {
      throw err;
    }
  }

}

export default CommonController;
