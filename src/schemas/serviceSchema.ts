import mongoose from 'mongoose';
import { MODEL_NAMES } from './../utils/constants';

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model(MODEL_NAMES.service, serviceSchema);

export default Service;
