const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const OrderSchema = new mongoose.Schema(
  {
    order_datetime: {
      type: Date,
      required: true,
    },
    services: {
      type: Array,
      ref: "service",
    },
    totalfee: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "INCOMPLETE",
      enum: ["COMPLETE", "INCOMPLETE"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", OrderSchema);
