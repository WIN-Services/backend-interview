const mongoose = require('mongoose');

var orders = mongoose.Schema({
    dateTime: {
        type: Date,
        required: true
    },
    totalFee: {
        type: Number,
        required: true
    },
    services: {
        type: [mongoose.Types.ObjectId],
        required: true
    }
});

module.exports = mongoose.model('orders', orders, 'orders');