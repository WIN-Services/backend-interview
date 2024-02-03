import { MESSAGES } from "../../constants/messages";
import ServicesModel from "../models/services.model";
export class ServicesHelper {
  constructor() {}

  createService = async (serviceName: string, fees: number) => {
    try {
      console.log(serviceName, fees);
      const checkServiceExists = await ServicesModel.findOne({
        where: { serviceName: serviceName },
        raw: true,
      });
      if (checkServiceExists) {
        return {
          error: true,
          message: MESSAGES.SERVICES.CREATE.ALREADY_EXISTS,
        };
      }
      const createService = await ServicesModel.create({
        serviceName: serviceName,
        fees: fees,
      });
      if (createService) {
        return {
          error: false,
          message: MESSAGES.SERVICES.CREATE.SUCCESS,
        };
      }
    } catch (error: any) {
      console.log(error);
      return {
        error: true,
        message: MESSAGES.SERVICES.CREATE.FAIL,
      };
    }
  };

  getAvailableServices = async (limit: number, offset: number) => {
    try {
      const getAvailableServices = await ServicesModel.findAll({
        limit: limit,
        offset: offset,
      });
      if (getAvailableServices) {
        return {
          error: false,
          data: getAvailableServices,
          message: MESSAGES.SERVICES.FETCH.SUCCESS,
        };
      }
      return {
        error: true,
        message: MESSAGES.SERVICES.FETCH.FAIL,
      };
    } catch (error: any) {
      return {
        error: true,
        message: MESSAGES.SERVICES.FETCH.FAIL,
      };
    }
  };
}

export default new ServicesHelper();
