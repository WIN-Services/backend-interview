const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    totalfee:{
        type: Number,
        required: true
    },
    services :{
        type: Array,
        required: true
    },

},{timestamps: true})

module.exports = mongoose.model('Order', orderSchema)