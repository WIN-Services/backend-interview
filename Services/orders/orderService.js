import OrderModel from "../../models/OrderModel.js";
import mongoose from "mongoose";

export async function createOrder(body) {

    return await new OrderModel(body).save();
}

export async function updateOrder(body, orderId) {


    await OrderModel.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(orderId) },
        { $set: body }
    ).lean();

    return true;
}

export function getOrderById(id) {
    return OrderModel.findOne({ _id: mongoose.Types.ObjectId(id) }).lean();
}

export async function getOrders(limit, skip) {

    skip = parseInt(skip) || 0;
    limit = parseInt(limit) || 20;

    const data = await OrderModel.find({
    })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

    const totalCount = await OrderModel.find({}).count();

    return {
        data,
        totalCount,
        skip,
        limit,
    };
}

export async function deleteOrder(id) {
    return OrderModel.updateOne({ _id: mongoose.Types.ObjectId(id) }, { isDeleted: true })
}
