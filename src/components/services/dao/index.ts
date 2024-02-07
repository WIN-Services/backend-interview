import AppError from "../../../utils/appError";
import logger from "../../../config/logger";

import Service from "../serviceModel";
import { ServiceType } from "../types";

export const createServiceDao = async (payload: Partial<ServiceType>) => {
    try {
        return await Service.create(payload)
    } catch (error) {
        logger.error(error)
        throw error
    }
}
