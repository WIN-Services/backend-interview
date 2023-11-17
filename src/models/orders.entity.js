const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    datetime: { type: Date, default: Date.now, required: true },

    totalfee: {
      type: Number,
      required: true,
    },
    // services: [serviceSchema], 
    services:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service'
    }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
