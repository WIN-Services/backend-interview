import { NextFunction, Request, Response } from "express"
import AppError from "../../../utils/appError"

import { getOrderDao } from "../dao"
import { responseHandler } from "../../../helpers/responseHandlers"
import Messages from "../../../helpers/messages"


const getOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response> => {
    try {
        const { orderId } = req.params

        const result = await getOrderDao({ _id: orderId })
        if (!result) {
            throw new AppError(Messages.ORDER_NOT_FOUND, 404)
        }


        return responseHandler({ res, status: 200, message: Messages.ORDER_FETCH, data: result })
    } catch (error) {
        next(error)
    }
}


export default getOrder