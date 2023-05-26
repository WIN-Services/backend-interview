const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    id: {type: String},
    datetime: { type: Date },
    totalfee: { type: String },
    services: [{
        type: mongoose.Types.ObjectId,
        ref: "services"
    }]
  },
  {strict: true}
)

const orderModel = mongoose.model("orders", orderSchema);

module.exports =  orderModel;