import { getServiceService } from "./../service/service.service";
import { addOrderService } from "./order.service";
import { Request, Response } from "express";

export const addOrderController = async (req: Request, res: Response) => {
  try {
    const data = await addOrderService(req.body);
    return res.status(201).json({
      status: true,
      message: data,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err,
    });
  }
};

export const getOrderController = async (req: Request, res: Response) => {
  try {
    const data = await getServiceService(req.query || {});
    return res.status(201).json({
      status: true,
      message: data,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err,
    });
  }
};
