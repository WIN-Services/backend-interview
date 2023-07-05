'use strict'

const orderServices = require('../services/orderServices')
const orderRepository = require('../respositories/orderRespository')
const errorHandling = require('../helpers/errorHandling')

let lastUpdatedTime = null;

module.exports.getAllOrders = async (req, res, next) => {

    try {
        let result = await orderServices.getAllOrders(req, req.id)
        if (result) {
            res.body = errorHandling.successResponse(result, 200);

        } else {
            let message = 'There are currently no orders present'
            res.body = errorHandling.errorResponse(message, 404);

        }
    }
    catch (err) {
        let message = 'Internal Server Down'
        res.body = errorHandling.errorResponse(message, 500);
    }
    next()
}

module.exports.getOrdersById = async (req, res, next) => {

    try {
        let reqID = req.params.id ? req.params.id : 0
        let result = await orderServices.getOrdersById(reqID)
        if (result) {

            res.body = errorHandling.successResponse(result, 200);
        }
        else {

            let message = 'There are no records associated with the ID mentioned'
            res.body = errorHandling.errorResponse(message, 404);
        }
    }
    catch (err) {

        let message = 'Internal Server Error'
        res.body = errorHandling.errorResponse(message, 500);
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

                let message = 'Record already exists , Please create a different one'
                res.body = errorHandling.successResponseMsg(message, 200);
            } else {

                let message = 'A new record is successfully created'
                res.body = errorHandling.successResponseMsg(message, 201);
            }
        }
        else {
            let message = 'Please wait for 3 hours before proceeding to create records'
            res.body = errorHandling.errorResponse(message, 400);
        }
    }
    catch (error) {

        let message = 'Internal Server Error'
        res.body = errorHandling.errorResponse(message, 500);
    }
    next();
}

module.exports.updateOrders = async (req, res, next) => {

    try {
        let orderThreeHourCheck = await threeHourCheck();
        if (orderThreeHourCheck) {

            let response = await orderServices.updateOrder(
                req.params.id,
                req.body.totalfees
            );
            res.body.status(200) = response;
        }
        else {

            let message = 'Please wait for 3 hours before proceeding to update a record'
            res.body = errorHandling.successResponseMsg(message, 201);
        }
    } catch (error) {

        let message = 'Update failed!'
        res.body = errorHandling.errorResponse(message, 500);
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

        let deleteId = req.params.id ? req.params.id : 0
        let findRecord = await orderRepository.getOrdersById(deleteId)
        if (findRecord) {

            res.status(200).json({ message: 'Record Successfully deleted' }) = await orderRepository.deleteOrders(deleteId)
        }
        else {
            res.status(200).json('There are no records found to be deleted')

        }
    }
    catch (error) {
        let message = 'Failed to delete the record , Internal server error'
        res.body = errorHandling.errorResponse(message, 500);
    }
    next()
}