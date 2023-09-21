const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    datetime: {
        type: Date,
        default: Date.now
    },
    totalfee: {
        type: Number
    },
    services: [
        {
            id: String,
        },
    ],
})
module.exports = mongoose.model('Order', orderSchema)