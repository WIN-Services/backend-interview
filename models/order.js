import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    totalFee: {
      type: Number,
      required: true,
    },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
