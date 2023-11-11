require("dotenv").config();
const express = require("express");
const app = express();

//models
const OrderModel = require('../models/order.model')

app.use(express.json());

const { successHandler, errorHandler } = require("../helper/status");
const mongoose = require('mongoose')


//api for get orderById
exports.getOrderById = async (id) => {

    if (!id) {
        return { status: 400, message: "please add the orderId!" };
    }

    const fetchOrder = await OrderModel.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(id) }
        },
        {
            $lookup: {
                from: 'services',
                localField: 'service',
                foreignField: '_id',
                as: 'serviceName'
            }
        }, { $unwind: '$serviceName' },
        {
            $project: {
                productId: 1,
                item_name: 1,
                quantity: 1,
                Price: 1,
                createdAt: 1,
                'serviceName.name': 1
            }
        }
    ]);

    if (!fetchOrder || fetchOrder.length === 0 ) {
        return { status: 400, message: "Error feching the order!" };
    }
    return { status: 200, message: "Data fetched successfully", resp: fetchOrder };
};

//api for getall 0rders
exports.getOrder = async () => {
    const fetchOrder = await OrderModel.aggregate([
        {
            $lookup: {
                from: 'services',
                localField: 'service',
                foreignField: '_id',
                as: 'serviceName'
            }
        }, { $unwind: '$serviceName' },
        {
            $project: {
                productId: 1,
                item_name: 1,
                quantity: 1,
                Price: 1,
                createdAt: 1,
                'serviceName.name': 1
            }
        }
    ]);
    if (!fetchOrder) {
        return { status: 400, message: "Error feching the order!" };
    }
    return { status: 200, message: errorHandler.datafetched, resp: fetchOrder };
};

//api for order-creation
exports.addOrder = async (body) => {
    const { productId, item_name, quantity, Price, service } = body;

    if (!productId || !item_name || !quantity || !Price || !service) {
        return { status: 400, message: errorHandler.missing };
    }

    // Validate order creation within 3 hours
    try {
        await validateOrderCreation(productId);
    } catch (error) {
        return { status: 400, message: error.message };
    }

    const orderCreation = await OrderModel.create({
        productId: productId,
        item_name: item_name,
        quantity: quantity,
        Price: Price,
        service: service
    })

    if (orderCreation) {
        return { status: 201, message: successHandler.orderCreated };
    }
    else {
        return { status: 400, message: errorHandler.errorOrderCreation };
    }
};

//api for delete=order
exports.deleteOrder = async (id) => {
    if (!id) {
        return { status: 400, message: "please add the orderId!" };
    }

    const OrderDeletion = await OrderModel.findByIdAndDelete({ _id: id });

    if (!OrderDeletion) {
        return { status: 400, message: "Error deleting the order!" };
    }
    return { status: 200, message: "Order deleted sucessfully!" };
};

//api for update-order
exports.updateOrder = async (id, body) => {
    const { productId, item_name, quantity, Price, service } = body;

    if (!id) {
        return { status: 400, message: "please add the orderId!" };
    }

    // Validate order updation within 3 hours
    try {
        await validateOrderdUpdatation(id);
    } catch (error) {
        return { status: 400, message: error.message };
    }

    const Orderupdation = await OrderModel.updateOne(
        { _id: id },
        { $set: { productId, item_name, quantity, Price, service } },
        { new: true }
    )

    if (!Orderupdation) {
        return { status: 400, message: "Error updating the order!" };
    }

    return { status: 200, message: "Order updated sucessfully!", resp: Orderupdation };
};


//Validation for create-order within 3 hours of a pre-existing order
const validateOrderCreation = async (productId) => {
    const threeHoursAgo = new Date();
    threeHoursAgo.setHours(threeHoursAgo.getHours() - 3);

    // Check if there's any pre-existing order within the last 3 hours
    const recentOrder = await OrderModel.findOne({ productId: productId, createdAt: { $gt: threeHoursAgo } });

    if (recentOrder) {
        throw new Error('Cannot create order within 3 hours of a pre-existing order');
    }
};


//Validation for update-order within 3 hours of a pre-existing order
const validateOrderdUpdatation = async (id) => {
    const threeHoursAgo = new Date();
    threeHoursAgo.setHours(threeHoursAgo.getHours() - 3);

    // Check if there's any pre-existing order within the last 3 hours
    const recentOrder = await OrderModel.findOne({ _id: id, createdAt: { $gt: threeHoursAgo } });

    if (recentOrder) {
        throw new Error('Cannot create order within 3 hours of a pre-existing order');
    }
};