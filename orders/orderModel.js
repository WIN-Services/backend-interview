const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {
        totalfee: { 
            type: Number,
            default: 0,
        },
        services: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Service' 
        }]
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;