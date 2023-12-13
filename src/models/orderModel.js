const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  datetime: {
    type: Date,
    required: true,
    default: new Date()
  },
  totalfee: {
    type: Number,
    required: true,
  },
  services: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "service"
    },
  ],
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;
