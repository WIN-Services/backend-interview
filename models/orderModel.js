
const mongoose = require('mongoose');
require('./serviceModel')
const orderSchema = new mongoose.Schema({
  id: { type: String,required: true },
  datetime: { type: Date, default: new Date()},
  totalfee: { type: Number, required: true },
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true
    },
  ],
});


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;