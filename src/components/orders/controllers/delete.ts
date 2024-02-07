import { NextFunction, Request, Response } from "express"
import AppError from "../../../utils/appError"

import { deleteOrderDao, getOrderDao } from "../dao"
import { responseHandler } from "../../../helpers/responseHandlers"
import Messages from "../../../helpers/messages"


const deleteOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response> => {
    try {
        const { orderId } = req.params

        const result = await deleteOrderDao(orderId)
        if (!result) {
            throw new AppError(Messages.ORDER_NOT_FOUND, 404)
        }

        return responseHandler({ res, status: 200, message: Messages.ORDER_DELETED, data: { deleted: result } })
    } catch (error) {
        next(error)
    }
}


export default deleteOrder