import mongoose from 'mongoose';
import { MODEL_NAMES } from './../utils/constants';

const orderSchema = new mongoose.Schema(
  {
    datetime: {
      type: Date,
      required: true,
    },
    totalfee: {
      type: Number,
      required: true,
    },
    services: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: MODEL_NAMES.service,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model(MODEL_NAMES.order, orderSchema);

export default Order;
