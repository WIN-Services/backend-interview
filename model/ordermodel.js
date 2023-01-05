const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  fulfillmentStatus: {
    type: String,
    default: "pending",
  },
  OrderedAt: {
    type: Date,
    default: Date.now(),
  },
  UpdatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
