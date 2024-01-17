const { Schema, model } = require("mongoose")

const orderSchema = new Schema({
    id: Schema.Types.ObjectId,
    datetime: {
        type: Date,
        required: true,
        default: Date.now // You can set a default value if needed
      },
    totalfee: Number,
    services: [{
        _id: false,
        id: {
            type: String
        }
    }]
  })
  
  const Order = model("Order", orderSchema)
  module.exports = Order