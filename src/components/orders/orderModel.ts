import db from '../../connections/masterDB';
import mongoose from 'mongoose';
import { TOrder } from './types';

const { Schema } = mongoose;

// Creating an order schema
const orderSchema = new mongoose.Schema(
  {
    totalfee: {
      type: Number,
      required: [true, 'Total fee is required'],
    },
    services: [
      {

        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: [true, 'Service ID is required'],

      },
    ],

  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

const Order = db.model<TOrder>('Order', orderSchema);

export default Order;