import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    totalFee: {
      type: Number,
    },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
