const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    totalfee:
    {
        type: Number,
        required: true
    },
    services: [String],
},
    { timestamps: true }
);

module.exports = mongoose.model('order', orderSchema);