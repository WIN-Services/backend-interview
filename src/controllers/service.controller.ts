import { Request, Response } from "express";
import Services from "../services/servive.service"

const services = new Services();

class ServiceController {
  constructor() {}

  async createService(req: Request, res: Response) {
    try {
      if (!req.body.name) {
        throw "form body is not as expected";
      }

      const data = {
        name: req.body.name,
      };

      const newService = await services.createService(data);

      return res.status(201).json({
        message: "success",
        status: "created",
        data: newService,
      });
    } catch (err) {
      return res.status(500).json({
        message: "failure",
        status: "not created",
        data: { error: err },
      });
    }
  }

  async fetchAllServices(req: Request, res: Response) {
    try {
      const servicesfetched = await services.fetchAllServices();
      return res.status(200).json({
        message: "success",
        status: "ok",
        data: servicesfetched,
      });
    } catch (err) {
      return res.status(500).json({
        message: "failure",
        status: "not ok",
        data: { error: err },
      });
    }
  }

  async getService(req: Request, res: Response) {
    try {
      const serviceId = parseInt(req.params.id);
      const servicefetched = await services.fetchService(serviceId);
      return res.status(200).json({
        message: "success",
        status: "ok",
        data: servicefetched,
      });
    } catch (err) {
      return res.status(500).json({
        message: "failure",
        status: "not ok",
        data: { error: err },
      });
    }
  }

  async destroyService(req: Request, res: Response) {
    try {
        const serviceId = parseInt(req.params.id);
      const servicedestroyed = await services.fetchService(serviceId);

      if (!servicedestroyed) {
        throw "service does not exist";
      }

      return res.status(200).json({
        message: "success",
        status: "deleted",
        data: servicedestroyed,
      });
    } catch (err) {
      return res.status(500).json({
        message: "success",
        status: "not deleted",
        data: { error: err },
      });
    }
  }
}

export default ServiceController;
