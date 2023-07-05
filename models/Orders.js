const mongoose = require("mongoose")
const {Schema, model} = mongoose;
const OrderSchema = Schema({
    "services": {
        type: Array,
        required:true
    },
    "userId": {
        type: Number
    },
    "amount":{
        type:Number
    },
},{ timestamps: true })

const OrderModel = model('Order',OrderSchema)

module.exports = OrderModel;