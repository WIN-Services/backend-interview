const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const OrderSchema = new mongoose.Schema(
  {
    datetime: {
      type: Date,
      required: true,
    },
    services: {
      type: mongoose.Types.ObjectId,
      ref: "service",
    },
    fees: {
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
