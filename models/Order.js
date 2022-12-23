const mongoose = require('mongoose');
var orderSchema = new mongoose.Schema({
    total: Number,
    services:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "services"
    }],
    orderedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true,
})
module.exports = mongoose.model("Order", orderSchema);
