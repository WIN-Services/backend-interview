const orders = require("../../model/orders.model")
const { success, error } = require("../../common/res.common")
const { messages, http_codes } = require("../../constants/text.constant")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
const utcTime = require("../../common/cTime.common")

const deleteOrder = async (req, res) => {
    try {
        const bodyData = (req || {}).query || {};
        const body = Object.keys(bodyData)
        if (!body.length) {
            return error(http_codes.badRequest, messages.inValidBody, res)
        }
        const { orderId } = bodyData
        const filter = { _id: new ObjectId(orderId), is_active: true }
        if (!orderId) {
            return error(http_codes.badRequest, messages.orderIdRequired, res)
        }
        const isExist = await orders.findOne(filter)
        if (!isExist) {
            return error(http_codes.notFound, messages.ordersNotFound, res)
        }
        const updates = {}
        updates["is_active"] = false
        updates["updated_At"] = utcTime()
        const deleteOrder = await orders.findOneAndUpdate(filter, { $set: updates }, { new: true })
        if (deleteOrder) {
            return success(http_codes.ok, messages.orderDeletedSuccessfully, { deletedOrderId: deleteOrder._id }, res)
        } else {
            return error(http_codes.internalError, messages.internalServerError, res)
        }
    } catch (e) {
        console.log("error : ", e)
        return error(http_codes.internalError, messages.internalServerError, res)
    }
}

module.exports = deleteOrder