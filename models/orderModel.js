// models/orderModel.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  datetime: { type: Date, required: true },
  totalfee: { type: Number, required: true },
  services: [
    {
      id: { type: Number, required: true },
      name: { type: String },
    },
  ],
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
