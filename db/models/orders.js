const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    datetime: {
      type: Date,
      required: true,
    },
    totalfee: {
      type: Number,
      required: true,
    },
    user: {
      type: Number,
      required: true,
    },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceModel",
      },
    ],
  },
  {
    collection: "orders",
  }
);

const OrderModel = mongoose.model("Order", schema);

module.exports = {
  OrderModel,
};
