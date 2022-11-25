const mongoose = require('mongoose');

const orderEntity = mongoose.Schema({
    id: String,
    datetime: String,
    totalfee: Number,
    services: [{
        id: String
    }],
    lastUpdated: Number
})

module.exports = mongoose.model('OrderEntity', orderEntity);
