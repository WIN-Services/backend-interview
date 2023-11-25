import * as mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  dateTime: {type: Date, default: new Date()},
  totalFee: {type: Number, default: 0},
  services: [
    {
      id: {type: String, ref: 'services'}
    }
  ],
  updatedAt: {type: Date, default: new Date()}
});

export default mongoose.model("orders", orderSchema);