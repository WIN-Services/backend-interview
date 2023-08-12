const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    totalFee: {
        type: Number,
        default: 0,
    },
    services: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Service'
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);