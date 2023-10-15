const mongoose = require("mongoose");

var orderSchema = new mongoose.Schema(
    {
        services: [String],
        totalFee: Number,
        user: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("orders", orderSchema);
