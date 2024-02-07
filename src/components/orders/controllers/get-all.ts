import { NextFunction, Request, Response } from "express"
import AppError from "../../../utils/appError"

import { getOrderListDao } from "../dao"
import { responseHandler } from "../../../helpers/responseHandlers"
import Messages from "../../../helpers/messages"


const getAllOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response> => {
    try {
        const { page = '1', limit = '10', sortBy = 'createdAt', sortOrder = 'asc' } = req.query;

        const result = await getOrderListDao({ page: Number(page), limit: Number(limit), sortBy: sortBy.toString(), sortOrder: sortOrder.toString() })

        return responseHandler({ res, status: 200, message: Messages.ORDER_LIST_FETCH, data: result })
    } catch (error) {
        next(error)
    }
}


export default getAllOrder