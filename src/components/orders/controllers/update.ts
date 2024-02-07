import { NextFunction, Request, Response } from "express"
import AppError from "../../../utils/appError"
import { updateOrderValidation } from "../validations"
import { getOrderDao, updateOrderDao } from "../dao"
import { responseHandler } from "../../../helpers/responseHandlers"
import Messages from "../../../helpers/messages"


const updateOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response> => {
    try {
        const { orderId } = req.params
        const validator = await updateOrderValidation(req.body)

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
        const result = await updateOrderDao(orderId, req.body)


        return responseHandler({ res, status: 200, message: Messages.ORDER_UPDATED, data: result })
    } catch (error) {
        next(error)
    }
}


export default updateOrder