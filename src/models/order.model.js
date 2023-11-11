const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    productId: {
        type: String,
        required: true,
    },
    item_name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
    service:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
    }},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Order', orderSchema);
