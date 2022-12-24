import orderModel from "./order.model";

export const addOrderService = async (payload: any) => {
  return await orderModel.create(payload);
};

export const findOrderService = async (query: object) => {
  return await orderModel.find(query);
};
