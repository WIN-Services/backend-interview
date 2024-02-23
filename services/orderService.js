const messages = require('../helpers/messages');
const {statusCode} = require('../helpers/status');
const order = require('../models/orderModel');
const responseHandler = require('../handlers/responseHandler');

const orderService = {

    checkIfOrderExistInLastThreeHours: async (datetime) => {
        const ordersInLastThreeHours = await order.findOne({
            datetime: { $gte: datetime - 3 * 60 * 60 * 1000, $lte: datetime }
        });

        if(ordersInLastThreeHours) return true;
        return false;
    },
    createOrder: async (orderPayload) => {
        try {
            const checkIfOrderExist = await orderService.checkIfOrderExistInLastThreeHours(orderPayload.datetime);
            if(checkIfOrderExist) {
                return responseHandler.error(messages.ORDER_EXIST_INTERVAL, statusCode.FAILED);
            }
            const result = await order.create(orderPayload);
            return responseHandler.success(result, messages.ORDER_CREATED, statusCode.SUCCESS);
        }
        catch(error) {
            console.log('Error while creating an order', error.message);
            return responseHandler.error(error.message, statusCode.FAILED);
        }
    },

    getOrder: async (orderId) => {
        try {
            let orderData = await order.findById(orderId).populate('services');
            if(!orderData) return responseHandler.error(messages.ORDER_NOT_EXIST, statusCode.NOT_FOUND);
    
            return  responseHandler.success(orderData, messages.GET_ORDER, statusCode.SUCCESS);
        } catch(error) {
            console.log('Error while getting an order ', error.message);
            return responseHandler.error(error.message, statusCode.FAILED);
        }
    },
    getAllOrders: async () => {
        try {
            let orderData = await order.find().populate('services');
            if(!orderData) return responseHandler.error(messages.ORDER_NOT_EXIST, statusCode.NOT_FOUND);
    
            return  responseHandler.success(orderData, messages.GET_ALL_ORDERS, statusCode.SUCCESS);
        } catch(error) {
            console.log('Error while getting all orders ', error.message);
            return responseHandler.error(error.message, statusCode.FAILED);
        }
    },
    updateOrder: async (orderId, orderPayload) => {
        try {
            const checkIfOrderExist = await orderService.checkIfOrderExistInLastThreeHours(orderPayload.datetime);
            if(checkIfOrderExist) {
                return responseHandler.error(messages.ORDER_EXIST_INTERVAL, statusCode.FAILED);
            }
            const result = await order.findByIdAndUpdate(orderId, orderPayload, { new: true });
            return responseHandler.success(result, messages.ORDER_UPDATED, statusCode.SUCCESS);
        }
        catch(error) {
            console.log('Error while updating an order ', error.message);
            return responseHandler.error(err.message, statusCode.FAILED);
        }
    },
    deleteOrder: async (orderId) => {
        try {
            const result = await order.findByIdAndDelete(orderId);
            if(!result) {
                return responseHandler.error(messages.ORDER_NOT_FOUND, statusCode.FAILED);
            }
            return responseHandler.success(result, messages.ORDER_DELETED, statusCode.SUCCESS);
        }
        catch(error) {
            console.log('Error while deleting order', error.message);
            return responseHandler.error(error.message, statusCode.FAILED);
        }
    },
};

module.exports = orderService;