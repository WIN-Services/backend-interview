import { Request, Response } from "express";
import servicesHelper from "../helpers/services.helper";
import { RESPONSES } from "../../constants/responses";
import { MESSAGES } from "../../constants/messages";

export class ServicesController {
  constructor() {}

  async createService(req: Request, res: Response) {
    try {
      const { serviceName, fees } = req.body;
      const createService: any = await servicesHelper.createService(
        serviceName,
        fees
      );
      if (!createService.error) {
        return res.status(RESPONSES.SUCCESS).send({
          data: createService,
          message: MESSAGES.SERVICES.CREATE.SUCCESS,
          error: false,
        });
      }
      return res.status(RESPONSES.BADREQUEST).send({
        error: true,
        message: createService.message,
      });
    } catch (error: any) {
      return res.status(RESPONSES.BADREQUEST).send({
        message: MESSAGES.SERVICES.CREATE.FAIL,
        error: true,
      });
    }
  }

  async fetchAvailableServices(req: Request, res: Response) {
    try {
      console.log(req.query);
      const limit = Number(req.query.limit);
      const offset = Number(req.query.offset);
      const createService: any = await servicesHelper.getAvailableServices(
        limit,
        offset
      );
      if (!createService.error) {
        return res.status(RESPONSES.SUCCESS).send({
          data: createService,
          message: MESSAGES.ORDERS.CREATE.SUCCESS,
          error: false,
        });
      }
      return res.status(RESPONSES.BADREQUEST).send({
        error: true,
        message: MESSAGES.ORDERS.CREATE.FAIL,
      });
    } catch (error: any) {
      return res.status(RESPONSES.BADREQUEST).send({
        message: MESSAGES.ORDERS.CREATE.FAIL,
        error: true,
      });
    }
  }
}

export default new ServicesController();
