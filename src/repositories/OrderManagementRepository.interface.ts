import { IOrder } from "../server/dto/IOrder";
import { IRequestOrderParams } from "../server/controllers/orderManagementController/RequestOrderMiddleware";
import { IUpdateOrderParams } from "../server/controllers/orderManagementController/UpdateOrderMiddleware";
import { IOrders } from "../server/dto/IOrders";

export interface IOrderManagementRepository {
  save(Order: IRequestOrderParams): Promise<void>;
  getOrders(page: number, limit: number): Promise<IOrders>;
  getOrderDetails(orderId:string): Promise<IOrder>;
  updateOrder(order: IUpdateOrderParams): Promise<void>;
  deleteOrder(orderId: string): Promise<void>;
}
