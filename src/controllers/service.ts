import { Request, Response } from "express";
import { serviceService } from "../services/service";
import {
  CreateServiceSchema,
  UpdateServiceSchema,
} from "../validators/service";

export const getServices = async (req: Request, res: Response) => {
  try {
    // fetching all services and returning it
    const services = await serviceService.getServices();
    return res.status(200).json({ data: services });
  } catch (e) {
    res.status(500).json({
      error: "something went wrong",
    });
  }
};

export const getServiceById = async (req: Request, res: Response) => {
  const serviceId = +req.params.serviceId;

  try {
    // checking if serviceId is valid or not
    if (!serviceId) {
      return res.status(422).json({ error: "please send a valid serviceId" });
    }

    // checking if service with given serviceId exist or not
    const service = await serviceService.getServiceById(serviceId);
    if (!service) {
      return res
        .status(404)
        .json({ error: `service with serviceId: ${serviceId} does not exist` });
    }

    return res.status(200).json({ data: service });
  } catch (e) {
    res.status(500).json({
      error: "something went wrong",
    });
  }
};

export const addService = async (req: Request, res: Response) => {
  let payload = req.body;

  // validating the incoming request using 'zod'
  try {
    payload = CreateServiceSchema.parse(payload);
  } catch (e: any) {
    return res.status(422).json({
      error: e.errors,
    });
  }

  // creating the service
  try {
    const service = await serviceService.createService(payload);
    return res.status(200).json({ data: service });
  } catch (e) {
    res.status(500).json({
      error: "something went wrong",
    });
  }
};

export const updateService = async (req: Request, res: Response) => {
  const serviceId = +req.params.serviceId;
  let payload = req.body;

  // validating the incoming request using 'zod'
  try {
    payload = UpdateServiceSchema.parse(payload);
  } catch (e: any) {
    return res.status(422).json({
      error: e.errors,
    });
  }

  try {
    // checking if serviceId is valid or not
    if (!serviceId) {
      return res.status(422).json({ error: "please send a valid serviceId" });
    }

    // checking if service with given serviceId exist or not
    const service = await serviceService.getServiceById(serviceId);
    if (!service) {
      return res
        .status(404)
        .json({ error: `service with serviceId: ${serviceId} does not exist` });
    }

    // updating the service
    const updatedservice = await serviceService.updateService(
      serviceId,
      payload
    );
    return res.status(200).json({ data: updatedservice });
  } catch (e) {
    res.status(500).json({
      error: "something went wrong",
    });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  const serviceId = +req.params.serviceId;

  try {
    // checking if serviceId is valid or not
    if (!serviceId) {
      return res.status(422).json({ error: "please send a valid serviceId" });
    }

    // checking if service with given serviceId exist or not
    const service = await serviceService.getServiceById(serviceId);
    if (!service) {
      return res
        .status(404)
        .json({ error: `service with serviceId: ${serviceId} does not exist` });
    }

    // deleting the service from DB
    await serviceService.deleteServiceById(serviceId);
    return res.status(200).json({ data: "service deleted successfully" });
  } catch (e) {
    res.status(500).json({
      error: "something went wrong",
    });
  }
};
