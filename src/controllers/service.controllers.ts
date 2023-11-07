import { Request, Response } from "express";
import { ServiceService } from "../services/service.service";
import { ServiceRepo } from "../repository/sevice.repo";
import {validationResult} from 'express-validator';
const serviceService = new ServiceService(new ServiceRepo());

export class serviceController {
  constructor() { }
  async addService(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const arg = await serviceService.addService(req.body);
    return res.status(arg.status).json(arg);
  }

  async getService(req: Request, res: Response) {
    const id = req.params?.serviceId;
    const arg = await serviceService.getService(id);
    return res.status(arg.status).json(arg);
  }

  async deleteService(req: Request, res: Response) {
    const serviceId = req.params?.serviceId;
    const arg = await serviceService.deleteService(serviceId);
    return res.status(arg.status).json(arg);
  }

  async updateService(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const serviceId = req.params?.serviceId;
    const arg = await serviceService.updateService(serviceId,req.body);
    return res.status(arg.status).json(arg);
  }

  async allServiceList(req: Request, res: Response) {
    const arg = await serviceService.allServiceList();
    return res.status(arg.status).json(arg);
  }

}
