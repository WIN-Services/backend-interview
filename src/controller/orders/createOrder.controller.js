const orders = require("../../model/orders.model")
const { success, error } = require("../../common/res.common")
const { messages, http_codes } = require("../../constants/text.constant")
const Joi = require("joi")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
const queryToGetLastDocuments = require("../../common/queryToGetLastDocumentCreated.common")
const { calculateTimeDifference } = require("../../common/getTimeDIfference.common")

const createOrder = async (req, res) => {

    try {
        const bodyData = (req || {}).body || {};
        const schema = Joi.object({
            totalfee: Joi.number().required().strict(),
            is_active: Joi.boolean(),
            services: Joi.array().required().strict()
        });
        const schemaValidator = schema.validate(bodyData)
        if (schemaValidator.error) {
            return error(http_codes.badRequest, schemaValidator.error.message || messages.badRequest, res)
        }
        const getLastOrder = await orders.aggregate(queryToGetLastDocuments)
        const lastCreatedOrder = (((getLastOrder || [])[0] || {}).lastCreated || [])
        const lastUpdatedOrders = (((getLastOrder || [])[0] || {}).lastUpdated || [])
        if (lastCreatedOrder.length && lastUpdatedOrders.length) {
            if (calculateTimeDifference(lastCreatedOrder[0].created_At) < 3 || calculateTimeDifference(lastUpdatedOrders[0].updated_At) < 3) {
                return error(http_codes.badRequest, messages.canNotCreateOrder, res)
            }
        }
        const services = []
        if (req.body.services.length) {
            for (let i = 0; i < req.body.services.length; i++) {
                services.push({ serviceId: new ObjectId(req.body.services[i]) })
            }
            req.body.services = services
        } else {
            return error(http_codes.badRequest, messages.serviceNotFound, res)
        }
        const newOrder = await orders.create(req.body)
        if (newOrder) {
            return success(http_codes.created, messages.orderCreatedSuccessfully, { orderDetails: newOrder }, res)
        } else {
            return error(http_codes.internalError, messages.internalServerError, res)
        }
    } catch (e) {
        console.log("error : ", e)
        return error(http_codes.internalError, messages.internalServerError, res)
    }
}

module.exports = createOrder