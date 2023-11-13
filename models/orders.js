const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  _id: { 
    type: String,
    required: true,
    alias: 'id',
  },
  datetime: {
    type: Date,
    required: true,
  },
  totalfee: {
    type: Number,
    required: true,
  },
  services: {
    type: [serviceSchema],
    required: true,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
