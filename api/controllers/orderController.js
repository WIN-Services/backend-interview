'use strict'

const orderServices = require('../services/orderServices')
const orderRepository = require('../respositories/orderRespository')
const errorHandling = require('../helpers/errorHandling')
const constant = require('../helpers/constants')

let lastUpdatedTime = null;

module.exports.getAllOrders = async (req, res, next) => {

    try {
        let result = await orderServices.getAllOrders(req, req.id)
        if (result) {
            res.body = errorHandling.successResponse(result, 200);

        } else {
            res.body = errorHandling.errorResponse(constant.responseMessage.NO_ORDERS, 404);
        }
    }
    catch (err) {
        res.body = errorHandling.errorResponse(constant.responseMessage.SERVER, 500);
    }
    next()
}

module.exports.getOrdersById = async (req, res, next) => {

    try {
        let orderID = req.params ? req.params.id : 0
        let result = await orderServices.getOrdersById(orderID)
        if (result) {
            res.body = errorHandling.successResponse(result, 200);
        }
        else {
            res.body = errorHandling.errorResponse(constant.responseMessage.NO_RECORDS, 404);
        }
    }
    catch (err) {
        res.body = errorHandling.errorResponse(constant.responseMessage.SERVER, 500);
    }
    next()
}


module.exports.createOrders = async (req, res, next) => {

    try {

        let body = req.body
        let orderThreeHourCheck = await threeHourCheck();
        if (orderThreeHourCheck) {

            let response = await orderServices.createOrder(body);
            if (response.isPresent) {

                res.body = errorHandling.successResponseMsg(constant.responseMessage.RECORD_EXIST, 200);
            } else {
                res.body = errorHandling.successResponseMsg(constant.responseMessage.SUCCESS_RECORD, 201);
            }
        }
        else {

            res.body = errorHandling.errorResponse(constant.responseMessage.WAIT_RECORD, 400);
        }
    }
    catch (error) {
        res.body = errorHandling.errorResponse(constant.responseMessage.SERVER, 500);
    }
    next();
}

module.exports.updateOrders = async (req, res, next) => {

    try {
        let orderThreeHourCheck = await threeHourCheck();
        if (orderThreeHourCheck) {

            let updateOrderId = req.params ? req.params.id : 0
            let orderFees = req.body ? req.body.totalfees : 0
            let response = await orderServices.updateOrder(updateOrderId, orderFees);
            res.body.status(200) = response;
        }
        else {
            res.body = errorHandling.successResponseMsg(constant.responseMessage.UPDATE_RECORD_WAIT, 201);
        }
    } catch (error) {
        res.body = errorHandling.errorResponse(constant.responseMessage.UPDATE_FAIL, 500);
    }

    next()
}

let threeHourCheck = async (dateTime) => {

    if (lastUpdatedTime != null) {

        lastUpdatedTime = new Date(dateTime);
        let updatedTime = lastUpdatedTime.setHours(lastUpdatedTime.getHours() + 3)
        let currentTime = new Date();

        if (currentTime - updatedTime > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        lastUpdatedTime = new Date();
        return true;
    }
}

module.exports.deleteOrders = async (req, res, next) => {

    try {
        let deleteId = req.params ? req.params.id : 0
        let orderRecord = await orderRepository.getOrdersById(deleteId)
        if (!orderRecord) {

            await orderRepository.deleteOrders(deleteId)
            res.body = errorHandling.successResponseMsg(constant.responseMessage.DELETE_RECORD, 200)
        }
        else {
            res.body = errorHandling.successResponseMsg(constant.responseMessage.NO_RECORDS, 404)
        }
    }
    catch (error) {
        res.body = errorHandling.errorResponse(constant.responseMessage.SERVER, 500);
    }
    next()
}