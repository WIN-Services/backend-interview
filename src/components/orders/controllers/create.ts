import { NextFunction, Request, Response } from "express"
import AppError from "../../../utils/appError"
import { createOrderValidation } from "../validations"
import { createOrderDao, getOrderDao } from "../dao"
import { responseHandler } from "../../../helpers/responseHandlers"
import Messages from "../../../helpers/messages"


const createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response> => {
    try {
        const validator = await createOrderValidation(req.body)

        if (validator.error) {
            throw new AppError(validator.message, 422)
        }
        const checkIsExist = await getOrderDao({
            ...req.body, createdAt: {
                $gte: new Date(new Date().getTime() - 3 * 60 * 60 * 1000),
                $lte: new Date(),
            },
        })
        if (checkIsExist) {
            throw new AppError(Messages.ORDER_EXIST, 409)
        }
        const order = await createOrderDao(
            req.body
        )

        return responseHandler({ res, status: 201, message: Messages.ORDER_CREATED, data: order })
    } catch (error) {
        next(error)
    }
}


export default createOrder