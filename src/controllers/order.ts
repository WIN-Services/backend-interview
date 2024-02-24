import { Request, Response } from "express";
import { orderService } from "../services/order";
import { CreateOrderSchema, UpdateOrderSchema } from "../validators/order";
import { serviceService } from "../services/service";

export const getOrders = async (req: Request, res: Response) => {
  try {
    // fetching all orders and returning it
    const orders = await orderService.getOrders();
    return res.status(200).json({ data: orders });
  } catch (e) {
    res.status(500).json({
      error: "something went wrong",
    });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  const orderId = +req.params.orderId;

  try {
    // checking if orderId is valid or not
    if (!orderId) {
      return res.status(422).json({ error: "please send a valid orderId" });
    }

    // checking if order with given orderId exist or not
    const order = await orderService.getOrderById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ error: `order with orderId: ${orderId} does not exist` });
    }

    return res.status(200).json({ data: order });
  } catch (e) {
    res.status(500).json({
      error: "something went wrong",
    });
  }
};

export const addOrder = async (req: Request, res: Response) => {
  let payload = req.body;

  // checking if order was placed before 3hrs or not
  const latestOrder = await orderService.getLatestOrder();
  if (!latestOrder.length) {
    return res.status(500).json({
      error: "A new order can only be placed after 3 hrs of previous order",
    });
  }

  // validating the incoming request using 'zod'
  try {
    payload = CreateOrderSchema.parse(payload);
  } catch (e: any) {
    return res.status(422).json({
      error: e.errors,
    });
  }

  // checking the incoming serviceIds, whether they exist in DB or not
  const services = await serviceService.getServiceByIds(payload.services);
  const isValid = payload.services.every((requestedServiceId: number) => {
    return services.find((service) => service.id === requestedServiceId);
  });

  if (!isValid) {
    return res.status(422).json({ error: "Invalid serviceId." });
  }

  // creating the order
  try {
    const order = await orderService.createOrder(payload);
    return res.status(200).json({ data: order });
  } catch (e) {
    res.status(500).json({
      error: "something went wrong",
    });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  const orderId = +req.params.orderId;
  let payload = req.body;

  // checking if order was placed before 3hrs or not
  const latestOrder = await orderService.getLatestOrder();
  if (!latestOrder.length) {
    return res.status(500).json({
      error: "An order can only be updated after 3 hrs of previous order",
    });
  }

  // validating the incoming request using 'zod'
  try {
    payload = UpdateOrderSchema.parse(payload);
  } catch (e: any) {
    return res.status(422).json({
      error: e.errors,
    });
  }

  // checking the incoming serviceIds, whether they exist in DB or not
  if (payload.services.length) {
    const services = await serviceService.getServiceByIds(payload.services);
    const isValid = payload.services.every((requestedServiceId: number) => {
      return services.find((service) => service.id === requestedServiceId);
    });

    if (!isValid) {
      return res.status(422).json({ error: "Invalid serviceId." });
    }
  }

  try {
    // checking if orderId is valid or not
    if (!orderId) {
      return res.status(422).json({ error: "please send a valid orderId" });
    }

    // checking if order with given orderId exist or not
    const order = await orderService.getOrderById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ error: `order with orderId: ${orderId} does not exist` });
    }

    // updating the order
    const updatedOrder = await orderService.updateOrder(orderId, payload);
    return res.status(200).json({ data: updatedOrder });
  } catch (e) {
    res.status(500).json({
      error: "something went wrong",
    });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  const orderId = +req.params.orderId;

  try {
    // checking if orderId is valid or not
    if (!orderId) {
      return res.status(422).json({ error: "please send a valid orderId" });
    }

    // checking if order with given orderId exist or not
    const order = await orderService.getOrderById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ error: `order with orderId: ${orderId} does not exist` });
    }

    // deleting the order from DB
    await orderService.deleteOrderById(orderId);
    return res.status(200).json({ data: "order deleted successfully" });
  } catch (e) {
    res.status(500).json({
      error: "something went wrong",
    });
  }
};
