const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
    unique: true,
  },
  datetime: {
    type: Date,
    default: Date.now,
  },
  totalfee: {
    type: Number,
  },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
});

// Create an index on the order_id field
orderSchema.index({ order_id: 1 }, { unique: true });
module.exports = mongoose.model("Order", orderSchema);
