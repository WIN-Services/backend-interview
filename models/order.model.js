const mongoose = require('mongoose')

const Schema = mongoose.Schema

const OrderSchema = new Schema({
    oid: {
        type: String,
        unique: true,
        index:true
    },
    totalFee: {
        type: Number,
        default: 100
    },
    services: [{
        type: Schema.Types.ObjectId, ref: 'service'
    }],
    datetime: {
        type: Date
    },
    address: {
        type: String
    },
    isCancel: {
        type: Boolean,
        default: false
    }
},{timestamps:true});

module.exports = mongoose.model('order', OrderSchema);

