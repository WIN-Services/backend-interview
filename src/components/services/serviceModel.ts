import db from '../../connections/masterDB';
import mongoose from 'mongoose';
import { TService } from './types';

const { Schema } = mongoose;

// Creating a service schema
const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Service name is required'],
    },
    price: {
      type: Number,
      required: [true, 'Service price is required'],
    },
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

const Service = db.model<TService>('Service', serviceSchema);

export default Service;
