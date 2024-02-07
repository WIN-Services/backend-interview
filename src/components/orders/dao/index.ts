import AppError from "../../../utils/appError";
import { OrderType, TOrder } from "../types";
import logger from "../../../config/logger";
import Order from "../orderModel";
import Messages from "../../../helpers/messages";


export const createOrderDao = async (payload: Partial<OrderType>) => {
    try {
        return await Order.create(payload)
    } catch (error) {
        logger.error(error)
        throw error
    }
}

export const getOrderDao = async (filter: any): Promise<TOrder | null> => {
    try {
        const order = (await Order.findOne({ ...filter }))
        return order
    } catch (error) {
        logger.error(error)

        throw error
    }
}

export const updateOrderDao = async (_id: string, payload: Partial<TOrder>) => {
    try {
        const result = await Order.findOne({ _id })

        if (!result) {
            throw new AppError(Messages.ORDER_NOT_FOUND, 404)
        }
        result.set(payload)
        await result.save()
        return result
    } catch (error) {
        logger.error(error)

        throw error
    }
}


export const deleteOrderDao = async (_id: string) => {
    try {
        const order = await Order.findById(_id)
        if (!order) {
            throw new AppError(Messages.ORDER_NOT_FOUND, 404)
        }

        await Order.deleteOne({ _id })
        return true
    } catch (error) {
        logger.error(error)
        throw error
    }
}

export const getOrderListDao = async (payload: { page: number; limit: number; sortBy: string; sortOrder: string }) => {
    try {
        const { limit, page, sortBy, sortOrder } = payload
        const offset = (page - 1) * limit;



        const orders = await Order.aggregate([

            {
                $sort: {
                    [sortBy]: sortOrder === 'asc' ? 1 : -1,
                },
            },
            {
                $skip: offset,
            },
            {
                $limit: limit,
            },
            {
                $lookup: {
                    from: 'services',
                    localField: 'services',
                    foreignField: '_id',
                    as: 'services',
                },
            },

        ]);


        const totalOrders = await Order.countDocuments();
        const totalPages = Math.ceil(totalOrders / limit);
        return {
            orders,
            totalOrders,
            totalPages
        }
    } catch (error) {
        logger.error(error)
        throw error
    }
}