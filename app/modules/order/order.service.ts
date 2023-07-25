import { Variables } from '../../common/constants/variable.constants';
import orderRepository from './order.repository';
import { ORDER_MESSAGES } from './order.responses';
import { IOrder, OrderResponse } from './order.type';

// Function to check if there's an order within threshold (3 hours)
const checkForExistingOrder = async (): Promise<boolean> => {
  const thresholdTime = new Date();
  thresholdTime.setHours(
    thresholdTime.getHours() - Variables.THRESHOLD_FOR_ORDER_EDIT_IN_HOURS,
  );

  const existingOrder = await orderRepository.getOrderByThresholdTime(
    thresholdTime,
  );
  if (!existingOrder) return true;
  throw ORDER_MESSAGES.ORDER_EXIST_ERROR;
};

const getAllOrder = async (): Promise<IOrder[]> => {
  const orders = await orderRepository.getAllOrder();
  return orders;
};

const getOrder = async (id: string): Promise<IOrder> => {
  const order = await orderRepository.getOrder(id);
  if (!order) throw ORDER_MESSAGES.NOT_FOUND;
  return order;
};

const createOrder = async (order: IOrder): Promise<OrderResponse> => {
  await checkForExistingOrder();
  await orderRepository.createOrder(order);
  return ORDER_MESSAGES.ORDER_CREATED;
};

const updateOrder = async (order: IOrder): Promise<OrderResponse> => {
  await checkForExistingOrder();
  const orderData = await orderRepository.getOrder(order.id as string);
  if (!orderData) throw ORDER_MESSAGES.NOT_FOUND;
  await orderRepository.updateOrder(order);
  return ORDER_MESSAGES.ORDER_UPDATED;
};

const deleteOrder = async (id: string): Promise<OrderResponse> => {
  const { affected } = await orderRepository.deleteOrder(id);
  if (!affected) throw ORDER_MESSAGES.NOT_FOUND;
  return ORDER_MESSAGES.ORDER_DELETED;
};

export default {
  createOrder,
  updateOrder,
  getOrder,
  getAllOrder,
  deleteOrder,
};
