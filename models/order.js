import mongoose, { Mongoose } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    totalFee: {
      type: Number,
    },
    services: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
