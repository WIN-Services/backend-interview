import { NextFunction, Request, Response } from "express"
import AppError from "../../../utils/appError"

import { responseHandler } from "../../../helpers/responseHandlers"
import Messages from "../../../helpers/messages"
import { createServiceValidation } from "../validations"
import { createServiceDao } from "../dao"


const createService = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response> => {
    try {
        const validator = await createServiceValidation(req.body)

        if (validator.error) {
            throw new AppError(validator.message, 422)
        }

        const order = await createServiceDao(
            req.body
        )

        return responseHandler({ res, status: 201, message: Messages.ORDER_CREATED, data: order })
    } catch (error) {
        next(error)
    }
}


export default createService