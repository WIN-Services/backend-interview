import { ResponseData } from "../../constant/Response";
import {
  addServiceService,
  getServiceService,
  removeServiceService,
  updateServiceService,
} from "./service.service";
import { Request, Response } from "express";

export const addServiceController = async (req: Request, res: Response) => {
  try {
    const data = await addServiceService(req.body);
    return res.status(201).json({
      status: true,
      message: ResponseData.addService,
      data,
    });
  } catch (err:any) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getServiceController = async (req: Request, res: Response) => {
  try {
    const data = await getServiceService(req.query || {});
    return res.status(200).json({
      status: true,
      message: ResponseData.getService,
      data
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err,
    });
  }
};

export const removeServiceController = async (req: Request, res: Response) => {
  try {
    const data = await removeServiceService(req.params.id);

    return res.status(200).json({
      status: true,
      message: ResponseData.deleteService,
      data,
    });

  } catch (err:any) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const updateServiceController = async (req: Request, res: Response) => {
  try {
    const data = await updateServiceService(req.params.id,req.body);

    return res.status(200).json({
      status: true,
      message:ResponseData.updateService,
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
