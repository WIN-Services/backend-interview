import { orderDetail } from "../../constant/types";
import { userDetails } from "../../modals/user";
import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrderById,
  updateOrder,
} from "../../store/order/orderStore";

export const create = async (orderDetails: string[],user:userDetails): Promise<any> => {
  await createOrder(orderDetails,user);
};

export const get = async (): Promise<orderDetail[]> => {
  return await getOrder();
};

export const update = async (id: string, orderDetails: string[]): Promise<any> => {
  return await updateOrder(id, orderDetails);
};

export const remove = async (id: string): Promise<any> => {
  return await deleteOrder(id);
};

export const getOrderByIdService = async (
  id: string
): Promise<orderDetail> => {
  return await getOrderById(id);
};
