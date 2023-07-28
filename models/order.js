const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  datetime: {
    type: Date,
    required: true,
  },
  totalFee: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true
},
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
});

module.exports = mongoose.model("Order", orderSchema);
