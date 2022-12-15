import { OrderCreateDto } from "../../dto/order/order-create.dto";
import { OrderUpdateDto } from "../../dto/order/order-update.dto";
import { ServiceRecord } from "../../models/service-record.model";
import { Order } from "../../models/order.model";
import { Op } from "sequelize";
import moment from "moment";

class OrderService {

  static getInstance(): OrderService {
    return new OrderService;
  }

  async show(orderId: number): Promise<Order> {
    return Order.findOne({
      where: {
        id: orderId
      },
      include: [{
        model: ServiceRecord,
        as: "services"
      }]
    })
  }

  async showByServiceIdInPastThreeHours(serviceIds: number[]): Promise<Order> {
    const now = Date.now();
    return Order.findOne({
      where: {
        createdAt: {
          [Op.gte]: moment.utc().subtract(3, "hours")
        },
        ["$services.id$"]: serviceIds
      },
      subQuery: false,
      include: [{
        model: ServiceRecord,
        as: "services"
      }],
    })
  }

  async list(): Promise<Order[]> {
    return Order.findAll({
      include: [{
        model: ServiceRecord,
        as: "services"
      }]
    })
  }

  async create(data: OrderCreateDto): Promise<Order> {
    const order = await Order.create({
      total_fee: data.total_fee
    });
    await order.$add("services", data.service_ids) as ServiceRecord[];
    return order.reload({
      include: [{all: true}]
    });
  }

  async update(order: Order, data: OrderUpdateDto): Promise<Order> {
    const updatedOrder = await order.update(data);
    if (data.service_ids?.length >= 0) {
      await updatedOrder.$remove("services", order.services?.map(s => s.id))
      await updatedOrder.$add("services", data.service_ids);
    }

    return updatedOrder.reload();
  }

  async delete(order: Order): Promise<void> {
    return order.destroy();
  }
}

export const orderService = OrderService.getInstance();