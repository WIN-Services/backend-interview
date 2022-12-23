const CONFIG = require('../config/config').DB
const mongooseConnection = CONFIG.MONGOOSE_CONN_OBJECT

const mongoose = CONFIG.MONGOOSE_CONN
const { Schema } = mongoose

/**
 * Assumptions I've made here that we can add only 1 item per order,
 * per userId.
 */

const orderSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, required: true },
        item: {
            itemId: { type: Schema.Types.ObjectId, required: true },
            quantity: { type: Number }
        },
        totalCharge: { type: Number },
        currency: { type: String },
        modeOfTransaction: { type: String },
        transactionId: { type: Schema.Types.ObjectId }
    },
    {
        timestamps: true
    }
)

const order = mongooseConnection.model('orders', orderSchema, 'orders')
module.exports = order