const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    totalfee: { type: Number, required: true },
    services: [
      { type: Schema.Types.ObjectId, ref: "service", required: true },
    ],
  },
  { timestamps: true }
);


module.exports =  mongoose.model('orders', OrderSchema);