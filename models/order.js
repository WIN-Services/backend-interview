const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  datetime: {
    type: Date,
    required: true,
  },
  totalfee: {
    type: Number,
    required: true,
  },
  services: [
    {
      _id: {
        type: String,
      },
    },
  ],
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
