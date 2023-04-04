const mongoose = require('mongoose');


// orders model
const orderdata = new mongoose.Schema({
    orderid: {
        required: true,
        type: Number
    },
    datetime: {
        type: Date,
        default: Date.now// set the default value to the current date and time
    },
    totalfee: {
        required: true,
        type: Number
    },
    services: {
        type: [Number],
        default: []
    }
})


const orders = mongoose.model('orders',orderdata)
module.exports = {orders};