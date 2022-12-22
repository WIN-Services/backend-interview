/**
 * Third party library
 */
const ObjectId = require('mongoose').Types.ObjectId;

/**
 * Internal hel[er functions
 */
const { sendResponse } = require('../handlers/responseHandler')

/**
 * Database models
 */
const order = require('../../models/orders')


/**
 * This API can be improved by adding pagination technique to avoid fetching
 * of all the records for a particular user.
 * skip, limit - params can be added.
 */
/**
 * Updates existing order for a particular user based on itemId.
 * @param {Object} req Express request object 
 * @param {Object} res Express response object 
 */
const getAllOrders = async (req, res) => {
    const { userId } = req.body
    const allOrders = await order.find({ userId: ObjectId(userId) }).lean()
    return sendResponse(res, 200, allOrders, `All orders for ${userId}`)
}


/**
 * Updates existing order for a particular user based on itemId.
 * @param {Object} req Express request object 
 * @param {Object} res Express response object 
 */
const placeNewOrder = async (req, res) => {
    const {
        userId,
        itemId,
        quantity,
        currency,
        modeOfTransaction,
        transactionId
    } = req.body

    const lastOrder = await order
        .find({
            "userId": ObjectId(userId),
            "item.itemId": ObjectId(itemId),
            "item.quantity": ObjectId(quantity),
            "updatedAt": {
                $gt: new Date(
                    Date.now() - 3 * 60 * 60 * 1000
                )
            }
        })
        .sort({ "updatedAt": -1 })
        .lean()

    if (lastOrder) {
        // send not allowed 405
        return sendResponse(res, 405, {}, 'You cannot place order with same item & quantity in 3 hours. Please wait for 3 hours.')
    }

    const response = await order.create({
        userId: ObjectId(userId),
        item: {
            itemId: ObjectId(itemId),
            quantity
        },
        currency,
        modeOfTransaction,
        transactionId
    })

    return sendResponse(res, 200, response, `Order placed with Order ID - ${response?._id}`)
}

/**
 * Assumptions: orderId will be given in the request body
 */
/**
 * Updates existing order for a particular user based on itemId.
 * @param {Object} req Express request object 
 * @param {Object} res Express response object 
 */
const deleteExistingOrder = async (req, res) => {
    const { orderId } = req.body
    await order.remove({ _id: ObjectId(orderId) })
    return sendResponse(res, 200, {}, `Order ${orderId} cancelled`)
}

/**
 * assumptions: orderId must exists,
 * orderId, itemId, quantity, currency, modeOfTransaction details will be given
 * in the request body.
 */
/**
 * Updates existing order for a particular user based on itemId.
 * @param {Object} req Express request object 
 * @param {Object} res Express response object 
 */
const updateExistingOrder = async (req, res) => {
    const {
        orderId,
        itemId,
        quantity,
        currency,
        modeOfTransaction,
    } = req.body

    const lastOrder = await order
        .find({
            "_id": ObjectId(orderId),
            "item.itemId": ObjectId(itemId),
            "item.quantity": quantity,
            "updatedAt": {
                $gt: new Date(
                    Date.now() - 3 * 60 * 60 * 1000
                )
            }
        })
        .sort({ "updatedAt": -1 }) // most recently updated doc
        .lean()

    if (lastOrder) {
        // send not allowed 405
        return sendResponse(res, 405, {}, 'You cannot update same item & quantity in 3 hours. Please wait for 3 hours.')
    }

    const response = await order.updateOne(
        {
            "_id": ObjectId(orderId)
        },
        {
            $set: {
                "item.itemId": ObjectId(itemId),
                "item.quantity": ObjectId(quantity),
                currency,
                modeOfTransaction
                // transactionId will be updated afterwards newly updated transaction
            }
        }
    )
    return sendResponse(res, 200, response, 'Order updated.')
}

module.exports = {
    getAllOrders,
    deleteExistingOrder,
    updateExistingOrder,
    placeNewOrder
}