const mongoose = require("mongoose");
const ObjectId=mongoose.Schema.Types.ObjectId

const OrderSchema = new mongoose.Schema(
  {
   
    totalfee: {
      type: Number,
      required: true,
    },
    services: [
      {
        type:ObjectId,
        ref: "service",
      },
    ],
    datetime: {
      type: Date,
      default: Date.now(),
    },
  },{timestamps: true,});

module.exports = mongoose.model("order", OrderSchema);