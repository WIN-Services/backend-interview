const orders = require("../../model/orders.model")
const { success, error } = require("../../common/res.common")
const { messages, http_codes } = require("../../constants/text.constant")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
const utcTime = require("../../common/cTime.common")
const queryToGetLastDocuments = require("../../common/queryToGetLastDocumentCreated.common")
const { calculateTimeDifference } = require("../../common/getTimeDIfference.common")

const updateOrder = async (req, res) => {
    try {
        const bodyData = (req || {}).body || {};
        const body = Object.keys(bodyData)
        console.log(body)
        if (!body.length) {
            return error(http_codes.badRequest, messages.inValidBody, res)
        }
        const { totalfee, is_active, services, orderId } = bodyData
        const filter = { _id: new ObjectId(orderId), is_active: true }
        if (!orderId) {
            return error(http_codes.badRequest, messages.orderIdRequired, res)
        }
        const isExist = await orders.findOne(filter)
        if (!isExist) {
            return error(http_codes.notFound, messages.ordersNotFound, res)
        }
        const getLastOrder = await orders.aggregate(queryToGetLastDocuments)
        const lastCreatedOrder = (((getLastOrder || [])[0] || {}).lastCreated || [])
        const lastUpdatedOrders = (((getLastOrder || [])[0] || {}).lastUpdated || [])
        if (lastCreatedOrder.length && lastUpdatedOrders.length) {
            if (calculateTimeDifference(lastCreatedOrder[0].created_At) < 3 || calculateTimeDifference(lastUpdatedOrders[0].updated_At) < 3) {
                return error(http_codes.badRequest, messages.canNotCreateOrder, res)
            }
        }
        const updates = {}
        const servicesArray = []
        if (services && services.length) {
            for (let i = 0; i < services.length; i++) {
                servicesArray.push({ serviceId: new ObjectId(services[i]) })
            }
            updates["services"] = servicesArray
        }
        if (totalfee) {
            updates["totalfee"] = Number(totalfee)
        }
        if (is_active) {
            updates["is_active"] = is_active
        }
        updates["updated_At"] = utcTime()
        const updatedOrder = await orders.findOneAndUpdate(filter, updates, { new: true })
        if (updatedOrder) {
            return success(http_codes.ok, messages.orderUpdatedSuccessfully, { updatedOrder: updatedOrder }, res)
        } else {
            return error(http_codes.internalError, messages.internalServerError, res)
        }
    } catch (e) {
        console.log("error : ", e)
        return error(http_codes.internalError, messages.internalServerError, res)
    }
}
module.exports = updateOrder