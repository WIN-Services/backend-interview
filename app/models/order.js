const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  datetime: { type: Date, default: Date.now },
  totalfee: { Number },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
});

module.exports = mongoose.model("Order", orderSchema);
