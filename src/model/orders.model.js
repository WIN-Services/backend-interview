const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId
const { schemas } = require("../constants/text.constant");

const orderSchema = mongoose.Schema({
    totalfee: {
        type: Number,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    services:[{
        _id:false,
        serviceId:{
            type:ObjectId,
            // ref:schemas.services,
            required:true
        }
    }],
    created_At: {
        type: Date,
        default: Date.now,
        required: true
    },
    updated_At: {
        type: Date,
        default: Date.now,
        required: true
    },
});

module.exports = mongoose.model(schemas.orders, orderSchema)
