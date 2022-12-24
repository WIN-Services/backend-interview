import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    totalfee: {
      type: Number,
    },
    services: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: "services",
          required: true,
        },
        _id: false,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("order", OrderSchema);
